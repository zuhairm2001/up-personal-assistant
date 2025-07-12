import { Ollama } from "ollama"

const ollama_host = process.env.OLLAMA_HOST

const ollama = new Ollama({
  host: ollama_host 
})

export async function complete_chat(chat:string, system_prompt:string){

  const response = await ollama.generate({
    model: "llama3.2:latest",
    prompt: chat,
    system: system_prompt,
  })

  console.log(response.response)
}

complete_chat("hello can you meow", "You are a dog")
