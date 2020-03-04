using Game.Models;
using UnityEngine;
using Game.Scripts.Controllers;

namespace Game.Scripts.StateHandlers
{
    public class StateHandlerUnits
    {
        private StateUnits _stateUnits;
        private GameManager _gameManager;
        public StateHandlerUnits(StateUnits stateUnits, GameManager gameManager)
        {
            _stateUnits = stateUnits;
            _gameManager = gameManager;
            _stateUnits.units.OnAdd += OnAdd;
            _stateUnits.units.OnRemove += OnRemove;
            _stateUnits.units.OnChange += OnChange;
        }
        private void OnAdd(Unit unit, string key)
        {
            Debug.Log(key);
            GameObject gameObjectUnit = Object.Instantiate(
                _gameManager.PrefabUnit,
                new Vector3(unit.position.x, unit.position.y, unit.position.z),
                new Quaternion());

            ControllerUnit controllerUnit = gameObjectUnit.GetComponent<ControllerUnit>();
            controllerUnit.Id = key;
            controllerUnit.DesiredRotation.y = unit.rotation;

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
                            Position position = obj.Value as Position;
                            controllerUnit.DesiredPosition.x = position.x;
                            controllerUnit.DesiredPosition.z = position.z;
                            
                            Debug.Log("position changed");
                            break;
                        }
                        case "rotation":
                        {
                            controllerUnit.DesiredRotation.y = float.Parse(obj.Value.ToString());
                            break;
                        }
                    }
                });
            };
        }

        private void OnRemove(Unit unit, string key)
        {
            string idUnit = key;
            GameObject gameObjectUnit = _gameManager.Units[idUnit];
            Object.Destroy(gameObjectUnit);
            _gameManager.Units.Remove(idUnit);
            Debug.Log("Player Remove");
        }

        private void OnChange(Unit unit, string key)
        {
            Debug.Log("Player Change");
        }
    }
}