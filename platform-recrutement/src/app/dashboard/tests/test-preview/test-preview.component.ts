import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-test-preview',
  templateUrl: './test-preview.component.html',
  styleUrls: ['./test-preview.component.scss']
})
export class TestPreviewComponent {
  @Input() item: any;
  @Input() isQuiz: boolean;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  cancelAction() {
    this.cancel.emit();
  }
}
