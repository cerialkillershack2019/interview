package interview

import interview.user.AnswersService
import interview.user.User
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import java.util.*
import java.util.concurrent.ConcurrentHashMap

@Controller("/login")
class HelloController {

    private val answersService: AnswersService

    init {
        answersService = AnswersService()
    }

    private val usersAnswers: ConcurrentHashMap<UUID, User> = ConcurrentHashMap()

    @Get(produces = [MediaType.TEXT_PLAIN])
    fun generateUUID(): String {
        val userId = UUID.randomUUID()
        return userId.toString()
    }

    @Get(produces = [MediaType.TEXT_PLAIN])
    fun answers(): String {
        val userId = UUID.randomUUID()
        //usersAnswers.putIfAbsent(userId, )
        return userId.toString()
    }

}