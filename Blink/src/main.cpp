#include <Arduino.h>

const int buttons[3] = {4,32,21};
const int leds[3] = {5,33,2};
int score = 0;
const int interval = 1000;
int timeout = 3000;
long gameStart = 0;
bool gameStarted = false;

void setup() {
  Serial.begin(115200);
  delay(1000);
  gameStart = millis();
  gameStarted = true;
  for(int i=0; i<3; i++){
    pinMode(leds[i], OUTPUT);
    pinMode(buttons[i], INPUT_PULLUP);
  }
}

unsigned long ran_go = 0;
unsigned long previousMillis = 0;
unsigned long lastPress[3] = {0,0,0};
unsigned long ledOnTime[3] = {0,0,0};

bool reached[3] = {false,false, false};
const long cooldown = 300;
int ran = random(0, 3);

void loop() {
  unsigned long currentMillis = millis();
  if(currentMillis-gameStart>=30000 && !reached[0]){
    Serial.println("YOU LOSE - ALL NUMBERS READ");
    reached[0] = true;
    exit(0);
  }  else if (currentMillis-gameStart>=20000 && score<5 && !reached[1]){
    Serial.println("SPEED UP READING NUMBERS");
    reached[1] = true;
    timeout = 1000;
  } else if(currentMillis-gameStart>=10000 && score<5 && !reached[2]){
    Serial.println("START READING CARD NUMBERS");
    reached[2] = true;
    timeout = 2000;
  }
  if(currentMillis-previousMillis>=interval){
    previousMillis = currentMillis;
    ran = random(0, 3);
    digitalWrite(leds[ran], HIGH);
    ledOnTime[ran] = currentMillis;
  }
  for(int i=0; i<3; i++){
    if(digitalRead(leds[i])==HIGH && currentMillis-ledOnTime[i] >=timeout){
      digitalWrite(leds[i], LOW);
      score--;
      Serial.print("Missed, Score: "+score);
      Serial.println(score);
    }
  }
  for(int i=0; i<3; i++){
    if(digitalRead(buttons[i])==LOW && currentMillis-lastPress[i]>=cooldown){
      lastPress[i] = currentMillis;
      if(digitalRead(leds[i])==HIGH){
        digitalWrite(leds[i], LOW);
        score++;
        Serial.print("Score: ");
        Serial.println(score);
      }
  } 
  }
}

