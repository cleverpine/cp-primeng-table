import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgTable } from './primeng-table/primeng-table.component';
import { PrimeNgTableSettingsService } from './services/primeng-table-settings.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import * as i0 from "@angular/core";
export class PrimeNgTableModule {
    static forRoot(config) {
        return {
            ngModule: PrimeNgTableModule,
            providers: [PrimeNgTableSettingsService, { provide: 'config', useValue: config }],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PrimeNgTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: PrimeNgTableModule, declarations: [PrimeNgTable, CustomDatePipe], imports: [TableModule,
            ButtonModule,
            CalendarModule,
            MultiSelectModule,
            BrowserModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            TooltipModule,
            DropdownModule,
            InputTextModule,
            InputNumberModule,
            InputTextModule,
            InputTextareaModule], exports: [PrimeNgTable, CustomDatePipe] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PrimeNgTableModule, providers: [
            TableModule,
            ButtonModule,
            CalendarModule,
            FormsModule,
            ReactiveFormsModule,
            MultiSelectModule,
            DatePipe,
            CustomDatePipe,
            TooltipModule,
            DropdownModule,
            InputTextModule,
            InputNumberModule,
            InputTextModule,
            InputTextareaModule,
        ], imports: [TableModule,
            ButtonModule,
            CalendarModule,
            MultiSelectModule,
            BrowserModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            TooltipModule,
            DropdownModule,
            InputTextModule,
            InputNumberModule,
            InputTextModule,
            InputTextareaModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PrimeNgTableModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [PrimeNgTable, CustomDatePipe],
                    imports: [
                        TableModule,
                        ButtonModule,
                        CalendarModule,
                        MultiSelectModule,
                        BrowserModule,
                        BrowserAnimationsModule,
                        FormsModule,
                        ReactiveFormsModule,
                        TooltipModule,
                        DropdownModule,
                        InputTextModule,
                        InputNumberModule,
                        InputTextModule,
                        InputTextareaModule,
                    ],
                    exports: [PrimeNgTable, CustomDatePipe],
                    providers: [
                        TableModule,
                        ButtonModule,
                        CalendarModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MultiSelectModule,
                        DatePipe,
                        CustomDatePipe,
                        TooltipModule,
                        DropdownModule,
                        InputTextModule,
                        InputNumberModule,
                        InputTextModule,
                        InputTextareaModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWVuZy10YWJsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jcC1wcmltZW5nLXRhYmxlL3NyYy9saWIvcHJpbWVuZy10YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRXZFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRXhGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBc0M1RCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBMEI7UUFDdkMsT0FBTztZQUNMLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsU0FBUyxFQUFFLENBQUMsMkJBQTJCLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUNsRixDQUFDO0lBQ0osQ0FBQzsrR0FOVSxrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFuQ2QsWUFBWSxFQUFFLGNBQWMsYUFFekMsV0FBVztZQUNYLFlBQVk7WUFDWixjQUFjO1lBQ2QsaUJBQWlCO1lBQ2pCLGFBQWE7WUFDYix1QkFBdUI7WUFDdkIsV0FBVztZQUNYLG1CQUFtQjtZQUNuQixhQUFhO1lBQ2IsY0FBYztZQUNkLGVBQWU7WUFDZixpQkFBaUI7WUFDakIsZUFBZTtZQUNmLG1CQUFtQixhQUVYLFlBQVksRUFBRSxjQUFjO2dIQWtCM0Isa0JBQWtCLGFBakJsQjtZQUNULFdBQVc7WUFDWCxZQUFZO1lBQ1osY0FBYztZQUNkLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsaUJBQWlCO1lBQ2pCLFFBQVE7WUFDUixjQUFjO1lBQ2QsYUFBYTtZQUNiLGNBQWM7WUFDZCxlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLGVBQWU7WUFDZixtQkFBbUI7U0FDcEIsWUEvQkMsV0FBVztZQUNYLFlBQVk7WUFDWixjQUFjO1lBQ2QsaUJBQWlCO1lBQ2pCLGFBQWE7WUFDYix1QkFBdUI7WUFDdkIsV0FBVztZQUNYLG1CQUFtQjtZQUNuQixhQUFhO1lBQ2IsY0FBYztZQUNkLGVBQWU7WUFDZixpQkFBaUI7WUFDakIsZUFBZTtZQUNmLG1CQUFtQjs7NEZBb0JWLGtCQUFrQjtrQkFwQzlCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQztvQkFDNUMsT0FBTyxFQUFFO3dCQUNQLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsYUFBYTt3QkFDYix1QkFBdUI7d0JBQ3ZCLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixhQUFhO3dCQUNiLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2YsbUJBQW1CO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDO29CQUN2QyxTQUFTLEVBQUU7d0JBQ1QsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGlCQUFpQjt3QkFDakIsUUFBUTt3QkFDUixjQUFjO3dCQUNkLGFBQWE7d0JBQ2IsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixtQkFBbUI7cUJBQ3BCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBQcmltZU5nVGFibGUgfSBmcm9tICcuL3ByaW1lbmctdGFibGUvcHJpbWVuZy10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJpbWVOZ1RhYmxlQ29uZmlnIH0gZnJvbSAnLi9tb2RlbHMvcHJpbWVuZy10YWJsZS1jb25maWcnO1xuaW1wb3J0IHsgUHJpbWVOZ1RhYmxlU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wcmltZW5nLXRhYmxlLXNldHRpbmdzLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBUYWJsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdGFibGUnO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHsgQ2FsZW5kYXJNb2R1bGUgfSBmcm9tICdwcmltZW5nL2NhbGVuZGFyJztcbmltcG9ydCB7IE11bHRpU2VsZWN0TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9tdWx0aXNlbGVjdCc7XG5pbXBvcnQgeyBDdXN0b21EYXRlUGlwZSB9IGZyb20gJy4vcGlwZXMvY3VzdG9tLWRhdGUucGlwZSc7XG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcbmltcG9ydCB7IERyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9kcm9wZG93bic7XG5pbXBvcnQgeyBJbnB1dFRleHRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2lucHV0dGV4dCc7XG5pbXBvcnQgeyBJbnB1dE51bWJlck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvaW5wdXRudW1iZXInO1xuaW1wb3J0IHsgSW5wdXRUZXh0YXJlYU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0YXJlYSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1ByaW1lTmdUYWJsZSwgQ3VzdG9tRGF0ZVBpcGVdLFxuICBpbXBvcnRzOiBbXG4gICAgVGFibGVNb2R1bGUsXG4gICAgQnV0dG9uTW9kdWxlLFxuICAgIENhbGVuZGFyTW9kdWxlLFxuICAgIE11bHRpU2VsZWN0TW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBUb29sdGlwTW9kdWxlLFxuICAgIERyb3Bkb3duTW9kdWxlLFxuICAgIElucHV0VGV4dE1vZHVsZSxcbiAgICBJbnB1dE51bWJlck1vZHVsZSxcbiAgICBJbnB1dFRleHRNb2R1bGUsXG4gICAgSW5wdXRUZXh0YXJlYU1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1ByaW1lTmdUYWJsZSwgQ3VzdG9tRGF0ZVBpcGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBUYWJsZU1vZHVsZSxcbiAgICBCdXR0b25Nb2R1bGUsXG4gICAgQ2FsZW5kYXJNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBNdWx0aVNlbGVjdE1vZHVsZSxcbiAgICBEYXRlUGlwZSxcbiAgICBDdXN0b21EYXRlUGlwZSxcbiAgICBUb29sdGlwTW9kdWxlLFxuICAgIERyb3Bkb3duTW9kdWxlLFxuICAgIElucHV0VGV4dE1vZHVsZSxcbiAgICBJbnB1dE51bWJlck1vZHVsZSxcbiAgICBJbnB1dFRleHRNb2R1bGUsXG4gICAgSW5wdXRUZXh0YXJlYU1vZHVsZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUHJpbWVOZ1RhYmxlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBQcmltZU5nVGFibGVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFByaW1lTmdUYWJsZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUHJpbWVOZ1RhYmxlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbUHJpbWVOZ1RhYmxlU2V0dGluZ3NTZXJ2aWNlLCB7IHByb3ZpZGU6ICdjb25maWcnLCB1c2VWYWx1ZTogY29uZmlnIH1dLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==