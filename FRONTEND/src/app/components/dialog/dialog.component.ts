import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { DialogOptions, DialogService } from '../../services/dialog.service';

@Component({
    selector: 'app-dialog',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {

    public showDialog: boolean = false;
    public message: string = '';
    public options: DialogOptions | null = null;

    @Output() public onConfirm: Function = () => { };
    @Output() public onCancel: Function = () => { };

    constructor(private dialogService: DialogService) {
        this.dialogService.onShow().subscribe((options) => {
            const message = typeof options === 'string' ? options : options.message;
            this.options = typeof options === 'string' ? null : options;
            this.message = message;
            this.showDialog = true;
        });
    }

    ngOnInit(): void { }

    public close() {
        this.showDialog = false;
        this.message = '';
    }

    public confirm() {
        this.close();
        setTimeout(() => {
            this.dialogService.confirm();
        }, 200);
    }

    public cancel() {
        this.close();
        setTimeout(() => {
            this.dialogService.cancel();
        }, 200);
    }

}
