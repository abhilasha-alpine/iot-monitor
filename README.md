# Projects Overview

This repository contains one innovative IoT based application designed as below:

- **Project 1:** IoT Food Waste Monitoring System with AI-powered Spoilage Alerts

---

## Table of Contents
- [Project 1: Food Waste Monitoring App](#project-1-food-waste-monitoring-app)
  - [Overview](#overview)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Setup & Deployment](#setup--deployment)
  - [Usage & Demo](#usage--demo)

---

## **Project 1: IoT Food Waste Monitoring System** 

### **Overview**
An affordable IoT-based system that monitors food freshness using gas sensors, temperature, and humidity sensors. It predicts spoilage and sends alerts via Telegram. The system helps households and small businesses reduce food waste efficiently.

### **Features**
- Real-time environment monitoring with sensors (gas, temperature, humidity)
- AI-driven shelf-life prediction and expiry alerts
- Remote monitoring and control via Telegram bot
- Local display for live sensor readings
- Cost-effective hardware and software design

### **Technology Stack**
- **Hardware:** ESP8266 microcontroller, MQ-135 Gas Sensor, DHT11 Sensor, OLED display
- **Software:** Arduino IDE, C++
- **Cloud & APIs:** Telegram Bot API, Local Wi-Fi network
- **Backend:** AWS Lambda (for data processing), DynamoDB (for history storage)

### **Setup & Deployment**
1. Assemble hardware components following the schematics.
2. Program ESP8266 with Arduino IDE using provided code snippets.
3. Create a Telegram bot and obtain API tokens.
4. Deploy AWS Lambda functions for data processing and prediction.
5. Setup DynamoDB to store historical sensor data.
6. Connect sensors, upload firmware, and connect to Wi-Fi.
7. Start monitoring via Telegram commands or OLED display.

### **Usage & Demo**
- Check live sensor readings on OLED display.
- Enable alerts and shelf-life predictions via Telegram commands.
- System dynamically predicts spoilage, reducing food waste by up to 40%.

## **Acknowledgments**
Thanks to the open-source communities, hardware suppliers, and API providers for enabling these innovative projects!

---

Feel free to clone, customize, and extend these projects as needed. Good luck with your presentations and implementations!
