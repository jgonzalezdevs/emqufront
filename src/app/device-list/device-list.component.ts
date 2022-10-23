import { Component, OnInit } from '@angular/core';

import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  devices: any;
  resp: any;
  currentDevice = null;
  currentIndex = -1;
  ipv4: any = '192.168.0.1';
  stadistics: any;

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.readDevices();
    this.readStadistics();
  }

  readDevices(): void {
    this.deviceService.readAll()
      .subscribe(
        devices => {
          this.devices = devices;
          console.log(devices);
        },
        error => {
          console.log(error);
        }
      );
  }

  readStadistics(): void {
    this.deviceService.readDeviceStadistics()
      .subscribe(
        stadistics => {
          this.stadistics = stadistics
          console.log(stadistics["1"]);
        },
        error => {
          console.log(error);
        }
      );
  }

  refresh(): void {
    this.readDevices();
    this.currentDevice = null;
    this.currentIndex = -1;
  }

  setCurrentDevice(device, index): void {
    this.currentDevice = device;
    this.currentIndex = index;
  }

  deleteAllDevices(): void {
    this.deviceService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.readDevices();
        },
        error => {
          console.log(error);
        }
      );
  }

  pingDevice(ipv4): void {
    const data = {ipv4: ipv4}
    this.deviceService.pingDevice(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    console.log("PING")
  }

}
