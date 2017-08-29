import { ModuleWithProviders } from '@angular/core';

export interface IEmployee {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    designation?: IDesignation;
    designationId?: string;
    department?: IDepartment;
    departmentId?: string;
    address: string;
    city: string;
    state?: IState;
    stateId?: number;
    zip: number;
    gender: string;
}

export interface IDesignation {
    _id?: string;
    designationName?: string;
    description: string;
}

export interface IDepartment {
    _id?: string;
    departmentName?: string;
    description: string;
}

export interface ICustomer {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state?: IState;
    stateId?: number;
    zip: number;
    gender: string;
    orderCount?: number;
    orders?: IOrder[];
    orderTotal?: number;
}

export interface IState {
    abbreviation: string;
    name: string;
}

export interface IOrder {
    product: string;
    price: number;
    quantity: number;
    orderTotal?: number;
}

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}