import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ActivatedRoute } from '@angular/router';
import { businessInterface } from '../../core/interface/business.interface';
import { BusinessDetailsService } from '../../services/business/busines-details.service';
import { UserRoleDirective } from '../../core/directives/userRole/userRole.directive';
import { IndustryTypesPipe } from '../../pipes/industry-types.pipe';

@Component({
  selector: 'app-card-detail-business',
  standalone: true,
  imports: [SideNavComponent, UserRoleDirective, IndustryTypesPipe],
  templateUrl: './card-detail-business.component.html',
  styleUrl: './card-detail-business.component.css',
})
export class CardDetailBusinessComponent implements OnInit {
  businessDetails: businessInterface | null = null;

  constructor(private businessDetailsService: BusinessDetailsService) {}

  ngOnInit(): void {
    this.businessDetailsService.getBusinessDetails().subscribe((details) => {
      this.businessDetails = details;
    });
  }
}
