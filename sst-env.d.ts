/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
    "Auth": {
      "type": "sst.aws.Auth"
      "url": string
    }
    "DB": {
      "database": string
      "host": string
      "password": string
      "port": number
      "type": "sst.aws.Postgres"
      "username": string
    }
    "GoogleClientId": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "Vpc": {
      "type": "sst.aws.Vpc"
    }
    "Web": {
      "type": "sst.aws.Nextjs"
      "url": string
    }
  }
}
