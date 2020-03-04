using Game.Models;
using UnityEngine;
using Game.Scripts.Controllers;

namespace Game.Scripts.StateHandlers
{
    public class StateHandlerPlayers
    {
        private StatePlayers _statePlayers;
        private GameManager _gameManager;
        public StateHandlerPlayers(StatePlayers statePlayers, GameManager gameManager)
        {
            _statePlayers = statePlayers;
            _gameManager = gameManager;
            _statePlayers.players.OnAdd += OnAdd;
            //_statePlayers.players.OnRemove += OnRemove;
            //_statePlayers.players.OnChange += OnChange;
        }

        private void OnAdd(Player player, string key)
        {
            _gameManager.Players.Add(key, player);
            Debug.Log("Player Add");
        }
    }
}