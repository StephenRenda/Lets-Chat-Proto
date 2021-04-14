using System;
using System.Threading.Tasks;
using LetsChat.Api.Hubs;
using LetsChat.Api.Hubs.Clients;
using LetsChat.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Chatty.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;
        private int clientCount { get; set; }

        public ChatController(IHubContext<ChatHub, IChatClient> chatHub)
        {
            _chatHub = chatHub;

        }

        [HttpPost("messages")]
        public async Task Post(ChatMessage message)
        {
            // run some logic...
            await _chatHub.Clients.All.ReceiveMessage(message);

             Console.WriteLine(message.Message);
        }
        [HttpPost("join")]
        public async Task Welcome(ChatMessage message)
        {
            // run some logic...
            await _chatHub.Clients.All.ReceiveMessage(message);
             Console.WriteLine(message);
        }

    }
}