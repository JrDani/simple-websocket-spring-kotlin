package jrdani

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class WebsocketServiceApplication

fun main(args: Array<String>) {
	runApplication<WebsocketServiceApplication>(*args)
}
