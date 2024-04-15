#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

const char* ssid = "Aastha";
const char* password = "aastha22";

AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

void setup() {
  pinMode(18, OUTPUT);
  pinMode(19, OUTPUT);
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.println("hi");

  ws.onEvent(onWsEvent);
  server.addHandler(&ws);
  Serial.println("hi");

  server.begin();
}

void loop() {
  // Handle WebSocket events
}

void onWsEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
  Serial.println("hi");
  if (type == WS_EVT_CONNECT) {
    Serial.println("WebSocket client connected");
  }
  else if (type == WS_EVT_DATA) {
    Serial.println("Data received from client");
    String receivedData = String((char*)data);
    Serial.println("Received data: " + receivedData);

    // Here you can perform actions based on the received data
    // For example, you can send a response back to the client
    server->text(client->id(), "Received: " + receivedData);
  
    if (receivedData == "50") {
      Close();
    }
    else if (receivedData == "100") {
      Far();
    }
  }
}

void Close() {
  //Red light
  Serial.println("Entering cond 1");
  buzz();
}

void Far() {
  Serial.println("Entering Cond 2");
  buzz();
  delay(500);
  buzz();
  Serial.println("Exiting Cond 2");
}

void buzz() {
  digitalWrite(18, HIGH);
  digitalWrite(19, HIGH);
  delay(200);
  digitalWrite(18, LOW);
  digitalWrite(19, LOW);
}