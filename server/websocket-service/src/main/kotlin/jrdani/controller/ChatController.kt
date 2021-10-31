package jrdani.controller

import jrdani.model.Message
import jrdani.model.MessageResponse
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import java.text.SimpleDateFormat
import java.util.*

@Controller
class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topico/mensagens")
    fun send(message: Message): MessageResponse {
        val time = SimpleDateFormat("HH:mm").format(Date())

        return MessageResponse(
            origin = message.origin,
            text = message.text,
            time = time
        )
    }

}