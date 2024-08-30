import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface DialogOptions {
    message: string;
    confirmButton?: {
        text: string;
        class: string;
    } | null,
    cancelButton?: {
        text: string;
        class: string;
    } | null;
}

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    private $show: Subject<string | DialogOptions> = new Subject<string | DialogOptions>();
    private $cancel: Subject<void> = new Subject<void>();
    private $confirm: Subject<void> = new Subject<void>();

    show(options: string | DialogOptions): void {
        this.$show.next(options);
    }

    onShow() {
        return this.$show.asObservable();
    }

    cancel() {
        this.$cancel.next();
    }

    onCancel() {
        return this.$cancel.asObservable();
    }

    confirm() {
        this.$confirm.next();
    }

    onConfirm() {
        return this.$confirm.asObservable();
    }
}
