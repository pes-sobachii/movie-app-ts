export interface FetchedItemType {
    "adult": boolean,
    "backdrop_path": string,
    "genre_ids": number[],
    "id": number,
    "original_language": string,
    "original_title": string,
    "overview": string,
    "popularity": number,
    "poster_path": string,
    "release_date": string,
    "title": string,
    "video": boolean,
    "vote_average": number,
    "vote_count": number
}

export interface WholeFetchedData {
    dates: {maximum: string, minimum: string},
    page: number,
    results: FetchedItemType[],
    total_pages: number,
    total_results: number
}

export interface initialStateType {
    items: FetchedItemType[];
    totalPages: number;
    currentPage: number;
    isLoading: boolean;
}

export interface detailsInitialStateType {
    item: FetchedItemDetailsType | null;
    isLoading: boolean;
}

export interface BelongsToCollectionType {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export interface GenreType {
    id: number;
    name: string;
}

export interface ProductionCompanyType {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface ProductionCountryType {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguageType {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface FetchedItemDetailsType {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: BelongsToCollectionType;
    budget: number;
    genres: GenreType[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompanyType[];
    production_countries: ProductionCountryType[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguageType[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

