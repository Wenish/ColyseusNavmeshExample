using UnityEngine;
using Game.Scripts;
using Game.Models;

namespace Game.Scripts.Controllers
{
    public class ControllerCamera : MonoBehaviour
    {
        public GameManager GameManager;

        public async void Update()
        {
            // Exit Game  
            if (Input.GetKey(KeyCode.Escape))
            {
                Application.Quit();
                #if UNITY_EDITOR
                UnityEditor.EditorApplication.isPlaying = false;
                #endif
            }

            if(Input.GetMouseButtonDown(1) && GameManager.GameRoom != null)
            {
                RaycastHit hit;
                Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
                if(Physics.Raycast(ray, out hit, Mathf.Infinity))
                {
                    Debug.Log(hit.point);
                    Player player = GameManager.Players[GameManager.GameRoom.SessionId];
                    await GameManager.GameRoom.Send(new
                    {
                        ACTION_TYPE = "UNIT_MOVE_TO",
                        payload = new
                        {
                            hit.point.x,
                            hit.point.z,
                            player.idUnit
                        }
                    });
                }
            }
        }
    }
}