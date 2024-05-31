import { TestBed } from '@angular/core/testing';

import { ApiyoutubeService } from './apiyoutube.service';

describe('ApiyoutubeService', () => {
  let service: ApiyoutubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiyoutubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
