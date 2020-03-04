using UnityEngine;
using Colyseus;
using Game.Models;

namespace Game.Scripts
{
    public class GameManager : MonoBehaviour
    {
        public Room<State> GameRoom;
        private Client _client;
        public async void Start()
        {
            Debug.Log("Game Manager Start");

            var serverip = GetArg("-serverip");
            serverip = serverip != null ? serverip : "localhost";
            Debug.Log(serverip);

            var serverport = GetArg("-serverport");
            serverport = serverport != null ? serverport : "3000";
            Debug.Log(serverport);

            var roomname = GetArg("-roomname");
            roomname = roomname != null ? roomname : "match";
            Debug.Log(roomname);

            var token = GetArg("-token");
            Debug.Log(token);

            _client = new Client("ws://localhost:3000");

            GameRoom = await _client.JoinOrCreate<State>("match"/* , Dictionary of options */);
        }

        private void OnApplicationQuit()
        {
            Debug.Log("Leave");
            GameRoom.Leave();
        }

        private static string GetArg(string name)
        {
            var args = System.Environment.GetCommandLineArgs();
            for (int i = 0; i < args.Length; i++)
            {
                if (args[i] == name && args.Length > i + 1)
                {
                    return args[i + 1];
                }
            }
            return null;
        }
    }
}