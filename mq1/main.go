package main

import (
	"fmt"

	"github.com/streadway/amqp"
)

func main() {

	fmt.Println("Lets test go")

	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {

		fmt.Println(err)
		panic(err)
	}

	defer conn.Close()

	fmt.Print("Sucessfully connected")

	ch, err := conn.Channel()
	if err != nil {
		fmt.Println(err)
		panic(err)

	}

	defer ch.Close()

	q, err := ch.QueueDeclare(
		"TestQueue",
		false,
		false,
		false,
		false,
		nil,
	)

	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	fmt.Println(q)

	err = ch.Publish(
		"",
		"TestQueue",
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte("Is this working"),
		})

	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	fmt.Println("Published message to queue")

}
