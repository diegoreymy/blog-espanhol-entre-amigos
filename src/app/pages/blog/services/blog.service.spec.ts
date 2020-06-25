import { TestBed, getTestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IPostDetail } from '../models/IPostDetail.model';
import { IPosts } from '../models/IPosts.model';
import { environment } from 'src/environments/environment';

const expectedPostDetails: IPostDetail = {
  id: 1,
  title: 'title',
  slug: 'slug',
  date: '01/01/2020',
  horizontalImage: '/image.png',
  facebookImage: '/image.jpg',
  squareImage: '/image.png',
  content: 'content'
};

const expectedPosts: IPosts[] = [
  {
    id: 1,
    title: 'title',
    slug: 'slug',
    veticalImage: '/image.png'
  },
  {
    id: 2,
    title: 'title2',
    slug: 'slug2',
    veticalImage: '/image2.png'
  }
];

const API_URL = environment.API_URL;

describe('BlogService', () => {
  let injector: TestBed;
  let service: BlogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService],
    });

    injector = getTestBed();
    service = injector.inject(BlogService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getPosts', () => {
    service.getPosts().subscribe((res) => {
      expect(res).toEqual(expectedPosts);
    });
    const req = httpMock.expectOne(`${API_URL}/posts.json`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedPosts);
  });

  it('should getPostDetails', () => {
    service.getPostDetails('1').subscribe((res) => {
      expect(res).toEqual(expectedPostDetails);
    });
    const req = httpMock.expectOne(`${API_URL}/post/1.json`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedPostDetails);
  });
});
