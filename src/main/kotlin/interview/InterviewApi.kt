package interview

import io.micronaut.websocket.WebSocketBroadcaster
import io.micronaut.websocket.WebSocketSession
import io.micronaut.websocket.annotation.*
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import org.json.JSONObject
import org.reactivestreams.Publisher
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.util.concurrent.ConcurrentHashMap
import javax.annotation.PostConstruct

@ServerWebSocket("/ws/interview_attached/")
class InterviewApi(
    private val broadcaster: WebSocketBroadcaster
) {

    private val log: Logger = LoggerFactory.getLogger(InterviewApi::class.java)

    private val userUsernameMap = ConcurrentHashMap<WebSocketSession, String>()
    private var nextUserNumber = 1 // Assign to username for next connecting user

    @OnOpen
    fun onOpen(
        session: WebSocketSession
    ): Publisher<String> {
        val username = "$session${nextUserNumber++}"
        userUsernameMap[session] = username
        log.info("Stats client connected from ${session.requestURI.host}")
        return broadcaster.broadcast("Connected")
    }

    @OnMessage
    fun onMessage(
        message: InterviewAttachedEvent,
        session: WebSocketSession): Publisher<String> {
        return broadcaster.broadcast(message.name)
    }


    @OnClose
    fun onClose(
        session: WebSocketSession
    ): Publisher<String> {
        val removed = userUsernameMap.remove(session)
        log.info("Stats client connected $removed")
        return broadcaster.broadcast("Disconnected")
    }

    @OnError
    fun onError(
        session: WebSocketSession
    ) {
        log.info("Error")
    }


    @PostConstruct
    fun init() = GlobalScope.launch {
        launchBroadcaster()
    }

    private suspend fun launchBroadcaster() {
        while (true) {
            delay(1000)
            userUsernameMap.keys.filter { it.isOpen }.forEach { session ->
                session.sendAsync(
                    JSONObject()
                        .put("userMessage", "logs logs")
                        .put("userlist", userUsernameMap.values).toString()
                )
            }
        }
    }
}

data class InterviewAttachedEvent(
    val name: String,
    val answers: List<AnswerPair>
)

data class AnswerPair(
    val id: String,
    val correct: Boolean
)