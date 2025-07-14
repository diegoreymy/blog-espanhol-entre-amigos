import { TestBed, getTestBed } from '@angular/core/testing';
import { BlogService } from './blog.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { IPost } from '../models/IPost.model';
import { environment } from 'src/environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const expectedPostDetails: IPost = {
  id: 37,
  date: '2020-07-05T11:22:08',
  date_gmt: '2020-07-05T14:22:08',
  guid: {
    rendered: 'https://espanholentreamigos596581947.wordpress.com/?p=37'
  },
  modified: '2020-07-05T16:01:44',
  modified_gmt: '2020-07-05T19:01:44',
  slug: '5-diferencias-entre-el-espanol-de-espana-y-el-espanol-de-hispanoamerica',
  status: 'publish',
  type: 'post',
  link: 'https://espanholentreamigos596581947.wordpress.com/2020/07/05/5-diferencias-entre-el-espanol-de-espana-y-el-espanol-de-hispanoamerica/',
  title: {
    rendered: '5 diferencias entre el español de España y el español de&nbsp;Hispanoamérica.'
  },
  content: {
    rendered: '\n<p>Una de las cosas que más inquietud genera para quien quiere comenzar a estudiar español, es saber ¿Cuál español debo aprender, el de España o el de Hispanoamérica?, ¿Habrá mucha diferencia entre ambos? ¿Qué pasa si aprendo solo uno, podré comunicarme en los otros países?</p>\n\n\n\n<p>Bienvenido a un nuevo post, soy Marioly de “Español entre Amigos”, soy profesora de español para brasileños. Compartiré contigo desde mis experiencias como profesora, hasta mis experiencias personales y así trataré de aclarar todas las dudas que tengas sobre mi hermoso idioma nativo. Comencemos.</p>\n\n\n\n<h2><strong>1.- Aunque tengan diferencias, si aprendes uno u otro siempre te podrás comunicar:</strong></h2>\n\n\n\n<p>Comencemos por la diferencia más importante, y lo haremos usando la relación del portugués de Portugal con el portugués de Brasil, y te preguntarás ¿Qué tiene que ver eso con el español?</p>\n\n\n\n<p>Pues bien, <strong>cuando yo pienso en las diferencias del español, no puedo evitar pensar en las diferencias del portugués</strong>, y siempre comienzo preguntando a mis alumnos si <strong>a pesar de ser diferentes, brasileños y portugueses se entienden</strong>, ellos siempre confirman que sí.</p>\n\n\n\n<p>Lo mismo les digo a ellos <strong>con relación al español</strong>, que, <strong>aunque diferentes, conseguimos entendernos muy bien</strong>, a pesar de que el acento es diferente, utilicen jergas (girias) distintas a las nuestras, usen un pronombre personal que no usamos en Hispanoamérica, y, conjuguen el pretérito (o sea el pasado) distinto al nuestro. Entonces, <strong>no te preocupes en escoger alguno, siempre te podrás comunicar y te darás a entender.</strong></p>\n\n\n\n<p>Ahora bien, <strong>si tu propósito es comunicarte más con Hispanoamericanos</strong>, es decir, con colombianos, argentinos, chilenos, mexicanos etc., <strong>te recomiendo aprender español con algún hispanoamericano</strong>, y tú dirás ¿Pero Marioly, no acabas de decir que da lo mismo?, y si, da lo mismo, pero ¿qué pensarían ustedes si yo viviendo en Brasil decidiera hablar portugués como los portugueses, bajo la lógica de que ellos fueron quienes inventaron el idioma y son quienes lo deberían hablar correcto?</p>\n\n\n\n<p>Quizás ustedes se incomodarían y dirían, estás loca, ese portugués no es bonito, mejor aprende el de Brasil. Pues bien, <strong>la diferencia del acento podría ser tan marcada entre ambos acentos españoles, que quizás resulte incomodo escuchar a un extranjero adoptando un acento español que geográficamente no corresponde a nuestro continente.</strong></p>\n\n\n\n<p>Sería como creer que aprender inglés británico es mejor porque allí fue su origen, y tú dirías, ¡Hello! Eso es medio arcaico, aprende algo que todo el mundo use, aprende inglés americano.</p>\n\n\n\n<p>Hablemos entonces del español de Hispanoamérica, no es un español completamente unificado, pues dependiendo del país o la región, este puede variar también, pero sería como explorar la diversidad de acentos que existen en Brasil; cariocas, nordestinos, mineros, paulistas, entre otros, hablan diferente, pero te aseguro que entre todos se entienden muy bien, no un cien por ciento, pero si muy bien. </p>\n\n\n\n<p>Entonces que te recomiendo, <strong>trata de aprender un español neutro</strong>, y quizás muchas personas difieran al decir que no existe un acento o español neutro, pero a lo que me refiero con neutro es, <strong>trata de aprender un español que te permita hablar con todos, que te des a entender, y no trates de imitar un montón de acentos y expresiones que luego termine confundiendo las cosas.</strong></p>\n',
    protected: false
  },
  excerpt: {
    rendered: '<p>Una de las cosas que más inquietud genera para quien quiere comenzar a estudiar español, es saber ¿Cuál español debo aprender, el de España o el de Hispanoamérica?, ¿Habrá mucha diferencia entre ambos? ¿Qué pasa si aprendo solo uno, podré comunicarme en los otros países? Bienvenido a un nuevo post, soy Marioly de “Español entre<a class="more-link" href="https://espanholentreamigos596581947.wordpress.com/2020/07/05/5-diferencias-entre-el-espanol-de-espana-y-el-espanol-de-hispanoamerica/">Continue reading <span class="screen-reader-text">&#8220;5 diferencias entre el español de España y el español de&nbsp;Hispanoamérica.&#8221;</span></a></p>\n',
    protected: false
  },
  author: 189224800,
  featured_media: 40,
  comment_status: 'open',
  ping_status: 'open',
  sticky: false,
  template: '',
  format: 'standard',
  meta: {
    _coblocks_attr: '',
    _coblocks_dimensions: '',
    _coblocks_responsive_height: '',
    _coblocks_accordion_ie_support: '',
    advanced_seo_description: '',
    amp_status: '',
    spay_email: '',
    jetpack_publicize_message: ''
  },
  categories: [
    5078
  ],
  tags: [],
  'jetpack-related-posts': [],
  jetpack_featured_media_url: 'https://espanholentreamigos596581947.files.wordpress.com/2020/07/5-diferencias-espac3b1olespac3b1a-espac3b1olhispanoamerica-desktop.jpg',
  jetpack_publicize_connections: [],
  jetpack_shortlink: 'https://wp.me/pcamHI-B',
  jetpack_sharing_enabled: false,
  jetpack_likes_enabled: false,
  _links: {
    self: [
      {
        href: 'https://public-api.wordpress.com/wp/v2/sites/espanholentreamigos596581947.wordpress.com/posts/37'
      }
    ],
    collection: [
      {
        href: 'https://public-api.wordpress.com/wp/v2/sites/espanholentreamigos596581947.wordpress.com/posts'
      }
    ],
    about: [
      {
        href: 'https://public-api.wordpress.com/wp/v2/sites/espanholentreamigos596581947.wordpress.com/types/post'
      }
    ],
    author: [
      {
        embeddable: true,
        href: 'https://public-api.wordpress.com/wp/v2/sites/espanholentreamigos596581947.wordpress.com/users/189224800'
      }
    ],
    replies: [
      {
        embeddable: true,
        href: 'https://public-api.wordpress.com/wp/v2/sites/espanholentreamigos596581947.wordpress.com/comments?post=37'
      }
    ],
    'version-history': [
      {
        count: 17,
        href: 'https://public-api.wordpress.com/wp/v2/sites/espanholentreamigos596581947.wordpress.com/posts/37/revisions'
      }
    ],
    'predecessor-version': [
      {
        id: 55,
        href: 'https://public-api.wordpress.com/wp/v2/sites/espanholentreamigos596581947.wordpress.com/posts/37/revisions/55'
      }
    ],
    'wp:featuredmedia': [
      {
        embeddable: true,
        href: 'https://public-api.wordpress.com/wp/v2/sites/espanholentreamigos596581947.wordpress.com/media/40'
      }
    ],
    'wp:attachment': [
      {
        href: 'https://public-api.wordpress.com/wp/v2/sites/espanholentreamigos596581947.wordpress.com/media?parent=37'
      }
    ],
    'wp:term': [
      {
        taxonomy: 'category',
        embeddable: true,
        href: 'https://public-api.wordpress.com/wp/v2/sites/espanholentreamigos596581947.wordpress.com/categories?post=37'
      },
      {
        taxonomy: 'post_tag',
        embeddable: true,
        href: 'https://public-api.wordpress.com/wp/v2/sites/espanholentreamigos596581947.wordpress.com/tags?post=37'
      }
    ],
    curies: [
      {
        name: 'wp',
        href: 'https://api.w.org/{rel}',
        templated: true
      }
    ]
  }
};

const expectedPosts: IPost[] = [
  expectedPostDetails
];

const API_URL = environment.API_URL;

describe('BlogService', () => {
  let injector: TestBed;
  let service: BlogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [BlogService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
    const req = httpMock.expectOne(`${API_URL}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedPosts);
  });

  it('should getPostDetails', () => {
    service.getPostDetails('37').subscribe((res) => {
      expect(res).toEqual(expectedPostDetails);
    });
    const req = httpMock.expectOne(`${API_URL}/posts/37`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedPostDetails);
  });
});
