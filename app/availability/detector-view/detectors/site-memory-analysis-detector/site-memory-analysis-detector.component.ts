import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppAnalysisService, AvailabilityLoggingService } from '../../../../shared/services';
import { IDetectorResponse } from '../../../../shared/models/detectorresponse';
import { DetectorViewInstanceDetailComponent } from '../../detector-view-instance-detail/detector-view-instance-detail.component';
import { ChartType } from '../../../../shared/models/chartdata';
declare let d3: any;

@Component({
    templateUrl: '../../detector-view-instance-detail/detector-view-instance-detail.component.html',
    styles: ['.row { margin-top: 5px; }']
})
export class SiteMemoryAnalysisDetectorComponent extends DetectorViewInstanceDetailComponent {

    constructor(protected _route: ActivatedRoute, protected _appAnalysisService: AppAnalysisService, protected _logger: AvailabilityLoggingService) {
        super(_route, _appAnalysisService, _logger);
        this.detectorMetricsTitle = "Overall Physical Memory Usage per Instance";
        this.detectorMetricsDescription = "This is the overall percent memory in use on each instance. It is the sum of the physical memory used by all processes on the instance, which include both system and application usage"
        this.instanceDetailTitle = "Application Percent Physical Memory Usage";
        this.instanceDetailDescription = "This shows the percent physical memory usage of each application on the specific instance selected.";
    }

    processDetectorResponse(response: IDetectorResponse){
        this.detectorResponse = response;
        this.detectorMetrics = response.metrics.filter(x => x.name === "Percent Physical Memory Used");
        this.instanceDetailMetrics = response.metrics.filter(x => x.name !== "Percent Physical Memory Used");
        this.instanceDetailChartType = ChartType.stackedAreaChart;
    }

    getDetectorName(): string {
        return 'sitememoryanalysis';
    }
}