package interview

import io.javalin.Javalin
import io.javalin.websocket.WsContext
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import org.json.JSONObject
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.util.concurrent.ConcurrentHashMap

class StatsApi {

    private val log: Logger = LoggerFactory.getLogger(StatsApi::class.java)

    private val userUsernameMap = ConcurrentHashMap<WsContext, String>()
    private var nextUserNumber = 1 // Assign to username for next connecting user

    fun init() = GlobalScope.launch {
        Javalin.create().apply {
            ws("/logs") { ws ->
                ws.onConnect { ctx ->
                    val username = "User${nextUserNumber++}"
                    userUsernameMap[ctx] = username
                    log.info("Stats client connected from ${ctx.matchedPath()}")
                }
                ws.onClose { ctx ->
                    userUsernameMap.remove(ctx)
                    log.info("Stats client connected $ctx")
                }
            }
        }.start(7070)

        launchBroadcaster()
    }

    private suspend fun launchBroadcaster() {
        while (true) {
            delay(1000)
            userUsernameMap.keys.filter { it.session.isOpen }.forEach { session ->
                session.send(
                    JSONObject()
                        .put("userMessage", "logs logs")
                        .put("userlist", userUsernameMap.values).toString()
                )
            }
        }
    }
}