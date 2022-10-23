import { Component, OnInit } from '@angular/core';

import { DeviceService } from './../services/device.service';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css']
})
export class DeviceCreateComponent implements OnInit {

  device = {
    name: '',
    ipv4: '',
    os: 'LINUX',
    os_version: '',
    created: '',
    modified: '',
    is_active: true
  }

  submitted = false;

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

  createDevice(): void {
    const data = {
      name: this.device.name,
      ipv4: this.device.ipv4,
      os: this.device.os,
      os_version: this.device.os_version,
      created: this.device.created,
      modified: this.device.modified,
      is_active: this.device.is_active
    };

    this.deviceService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        }
      );
  }
  
  newDevice(): void {
    this.submitted = false;
    this.device = {
      name: '',
      ipv4: '',
      os: '',
      os_version: '',
      created: '',
      modified: '',
      is_active: true
    }
  }

}
