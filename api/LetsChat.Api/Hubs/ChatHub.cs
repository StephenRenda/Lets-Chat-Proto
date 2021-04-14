using System.Threading.Tasks;
using LetsChat.Api.Hubs.Clients;
using LetsChat.Api.Models;
using Microsoft.AspNetCore.SignalR;

namespace LetsChat.Api.Hubs
{
    public class ChatHub : Hub<IChatClient>
    { }
}