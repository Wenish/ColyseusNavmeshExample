using Game.Models;
using Colyseus.Schema;
using UnityEngine;
using Game.Scripts.Controllers;

namespace Game.Scripts.StateHandlers
{
    public class StateHandlerUnits
    {
        private StateUnits _stateUnits;
        private GameManager _gameManager;
        public StateHandlerUnits(StateUnits statePlayers, GameManager gameManager)
        {
            _stateUnits = statePlayers;
            _gameManager = gameManager;
            _stateUnits.units.OnAdd += OnAddUnit;
            _stateUnits.units.OnRemove += OnRemoveUnit;
            _stateUnits.units.OnChange += OnChangeUnit;
        }
        private void OnAddUnit(Unit unit, string key)
        {
            Debug.Log(key);
            GameObject gameObjectUnit = Object.Instantiate(
                _gameManager.PrefabUnit,
                new Vector3(unit.position.x, unit.position.y, unit.position.z),
                new Quaternion());

            ControllerUnit controllerUnit = gameObjectUnit.GetComponent<ControllerUnit>();
            controllerUnit.Id = key;

            _gameManager.Units.Add(key, gameObjectUnit);
            Debug.Log("Player Add");

            unit.OnChange += (changes) =>
            {
                changes.ForEach((obj) =>
                {
                    switch(obj.Field)
                    {
                        case "position":
                        {
                            //Position position = obj.Value as Position;
                            //playerController.DesiredPosition.x = position.x;
                            //playerController.DesiredPosition.z = position.z;
                            
                            Debug.Log("position changed");
                            break;
                        }
                    }
                });
            };
        }

        private void OnRemoveUnit(Unit unit, string key)
        {
            string idUnit = key;
            GameObject gameObjectUnit = _gameManager.Units[idUnit];
            Object.Destroy(gameObjectUnit);
            _gameManager.Units.Remove(idUnit);
            Debug.Log("Player Remove");
        }

        private void OnChangeUnit(Unit unit, string key)
        {
            Debug.Log("Player Change");
        }
    }
}