package interview.user

import interview.StatsApi
import javax.annotation.PostConstruct
import javax.inject.Singleton

@Singleton
class AnswersService {

    @PostConstruct
    fun initialize() {
        StatsApi().init()
    }

}