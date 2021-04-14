using System.Threading.Tasks;
using LetsChat.Api.Models;

namespace LetsChat.Api.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
        Task Send(string str);
    }

}

