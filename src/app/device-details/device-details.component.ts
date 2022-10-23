import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../services/device.service';


@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {

  currentDevice = null;
  message = '';

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getDevice(this.route.snapshot.paramMap.get('id'));
  }

  getDevice(id): void {
    this.deviceService.read(id)
      .subscribe(
        device => {
          this.currentDevice = device;
          console.log(device);
        },
        error => {
          console.log(error);
        }
      );
  }

  setAvailableStatus(status): void {
    const data = {
      name: this.currentDevice.name,
      ipv4: this.currentDevice.ipv4,
      os: this.currentDevice.os,
      os_version: this.currentDevice.os_version,
      is_active: this.currentDevice.is_active,
    };

    this.deviceService.update(this.currentDevice.id, data)
      .subscribe(
        response => {
          this.currentDevice.available = status;
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  updateDevice(): void {
    this.deviceService.update(this.currentDevice.id, this.currentDevice)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'El dispositivo fue actualizado';
        },
        error => {
          console.log(error);
        });
  }

  deleteDevice(): void {
    this.deviceService.delete(this.currentDevice.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/devices']);
        },
        error => {
          console.log(error);
        });
  }

}