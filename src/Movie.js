import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import styled from "styled-components";
import CommonStyle from './style/Grobal';
import { BsArrowLeft, BsArrowRight, BsX } from "react-icons/bs";

import MovieSlide from 'react-slick';
import 'slick-carousel/slick/slick.css';


//style 

const Wapper = styled.div`
background: #242424;
`
const MovieListWrapper = styled.section`
padding: 100px 0;
`
const Inner = styled.div`
max-width: 1600px;
margin: 0 auto;
`
const GridLayout = styled.ul`
display: grid;
/* mediaQuey 없이 반응형 만들기 1 */
/* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
grid-template-columns: repeat(4,1fr);
gap: 10px;
`

const GridItm = styled.li`
position: relative;
`

const Img = styled.img``

const Title = styled.strong`
position: absolute;
top: 0;
left: 0;
right: 0;
padding: 10px;
font-size: 19px;
font-weight: 500;
color: #00a7f6;
color: #fff;
line-height: 1.3;
background: rgba(0,0,0,0.7);
border-bottom: 1px solid #f44f53;
border-bottom: 1px solid rgb(85, 85, 85, 0.6);
`
const Desc = styled.span`
position: absolute;
bottom: 0;
left: 0;
right: 0;
color: #fff;
background: rgba(0,0,0,0.5);
padding: 20px;
font-size: 15px;
line-height: 1.3;
min-height: 130px;
`

const Header = styled.header`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
padding: 50px 100px;
text-align: center;
`
const H1 = styled.h1`
margin: 0 0 10px 0;
font-size:35px;
font-weight: 700;
color: #a067ac;
color: #00a7f6;
color: #c2ae65;
`

const Logo = styled.div`
display: flex;
flex-direction: column;
`
const Search = styled.div`
display: flex;
align-items: center;
position: absolute;
top: 50px;
right: 100px;
`

const MainTitle = styled.p`
margin: 0 0 30px 0;
color: #fff;
font-size: 14px;
/* text-transform: uppercase; */
`
const InputResult = styled.div`
margin: 20px 30px;
display: flex;
flex-wrap: wrap;
gap: 10px;
justify-content: right;
color: #ddd;
font-size: 13px;
font-weight: 300;
a {
    background: #00a7f6;
    background: #111;
    padding: 10px 30px;
    border-radius: 20px;
}
`

const Input = styled.input`
border: none;
outline: none;
border: 1px solid #555;
background: #242424;
color: #fff;
font-size: 15px;
padding: 8px;
width: 400px;
`
const Button = styled.button`
border: none;
background: #a067ac;
background: #00a7f6;
background: #c2ae65;

color: #fff;
padding: 8px 20px;
font-size: 13px;
font-weight: 300;
border-radius: 5px;
margin: 0 0 0 10px;
`
const ListBtnWrapper = styled.div`
text-align: center;
`

const ListBtn = styled.button`
border: none;
padding: 10px 15px 9px 15px;
margin: 0 1px;
background: #a067ac;
background: #00a7f6;
background: #111;
border-radius: 2px;
color: #eee;
`

const MoviePopWapper = styled.div`
position: fixed;
inset:  0 0 0 0;
z-index: 999;
background: rgba(0,0,0,0.5);
`

const MoviePop = styled.div`
position: absolute;
inset: 50% auto auto 50%;
transform: translate(-50%,-50%);

display: grid;
grid-template-columns: repeat(2, 1fr);
background: #020e32;
color: #fff;

width: 800px;
`

const MoviePopDesc = styled.div`
position:relative;
display: flex;
flex-direction: column;
padding: 50px;

overflow: hidden;
`

const MoviePopDescTitle = styled.h3`
font-size: 30px;
font-weight: 700;
margin: 0 0 30px 0;
`
const MoviePopDescDesc = styled.p`
font-size: 14px;
font-weight: 300;
line-height: 1.414;
`
const MoviePopDescYear = styled.p`
margin: auto 0 10px 0;
font-size: 14px;
font-weight: 300;
`
const MoviePopDescGenres = styled.ul`
font-size: 14px;
font-weight: 500;

display: flex;
flex-wrap: wrap;
gap: 10px;
`
const Genre = styled.li``
const MovieDetailClose = styled.span`
position: absolute;
inset: 0 0 auto auto;
font-size: 30px;
padding: 10px;
background: tomato;
`
const MovieSlideWrapper = styled.div`
position: relative;
color: #fff;
margin: 0 0 30px 0;
`

const MovieSlideLeftArrow = styled.span`
position: absolute;
inset: 50% auto auto 0;
transform: translate(0, -50%);

font-size: 30px;
padding: 15px;
background: rgba(0,0,0,0.5);

`
const MovieSlideRightArrow = styled.span`
position: absolute;
inset: 50% 0 auto auto;
transform: translate(0, -50%);

font-size: 30px;
padding: 15px;
background: rgba(0,0,0,0.5);
`


const GenreMovieWrapper = styled.section`
padding: 100px 0;
color: #fff;
`

const GenreMovieTitle = styled.h2`
font-size: 30px;
font-weight: 700;
width: 1600px;
margin: 0 auto 20px auto;
`

// const Hr = styled.hr`
// width: 1600px;
// margin: 20px auto;
// color: rgba(255,255,255,0.2);
// `

const Load = styled.div`
position: fixed;
inset: 0 0 0 0;
background: #333;
color: rgba(255,255,255,0.5);

font-size: 100px;

display: flex;
justify-content: center;
align-items: center;
`

const Footer = styled.footer`
padding: 100px 0;
text-align: center;
color: #fff;
`

// 1. 영화 만히 가져오기... list 버튼 만들기...
// 2. 영화 클릭하면 자세한 정보 보여주기...
// 3. 영화 슬라이드 만들기 slick npm react-slick
// 4. 영화 검색기능 만들기
// 5. 장르 별로 보여주기....
// 6. 로딩중 만들기...


const DetailMovie = ({ movie, on, setOn }) => {
    const { id } = useParams();
    // 1 === '1'
    const detailMovie = movie.find(it => String(it.id) === id);
    const cover = useRef();
    //https://stackoverflow.com/questions/65455975/using-useref-addeventlistener 참조
    // Useref는 rerender를 트리거하지 않고 useEffect 이전에 바인딩된 ref 객체입니다. 요소 없이 el.current를 사용하십시오.
    const scrollHandler = e => {
        e.preventDefault()
    }
    useEffect(() => {
        if (cover.current) {
            cover.current.addEventListener('wheel', scrollHandler);
            // return () => {
            //     cover.current.removeEventListener("scroll", scrollHandler);
            // };
        }
    }, [cover.current]);

    return (
        <>
            {
                detailMovie && on &&
                <MoviePopWapper

                    ref={cover}
                >
                    <MoviePop>
                        <div>
                            <img src={detailMovie.large_cover_image} alt="" />
                        </div>
                        <MoviePopDesc>
                            <MoviePopDescTitle>{detailMovie.title}</MoviePopDescTitle>
                            <MoviePopDescDesc>{detailMovie.description_full.substr(0, 400)}</MoviePopDescDesc>
                            <MoviePopDescYear>{detailMovie.year}</MoviePopDescYear>
                            <MoviePopDescGenres>
                                {
                                    detailMovie.genres?.map((it, idx) => {
                                        return <Genre key={idx}>{it}</Genre>
                                    })
                                }
                            </MoviePopDescGenres>
                            <MovieDetailClose onClick={() => setOn(false)}><BsX /></MovieDetailClose>
                        </MoviePopDesc>
                    </MoviePop>
                </MoviePopWapper>
            }
        </>
    )
}

const SearchMovie = ({ search, on, setOn }) => {
    const { id } = useParams();
    // 1 === '1'
    const detailMovie = search?.find(it => String(it.id) === id);
    const cover = useRef();
    //https://stackoverflow.com/questions/65455975/using-useref-addeventlistener 참조
    // Useref는 rerender를 트리거하지 않고 useEffect 이전에 바인딩된 ref 객체입니다. 요소 없이 el.current를 사용하십시오.
    const scrollHandler = e => {
        e.preventDefault()
    }
    useEffect(() => {
        if (cover.current) {
            cover.current.addEventListener('wheel', scrollHandler);
            // return () => {
            //     cover.current.removeEventListener("scroll", scrollHandler);
            // };
        }
    }, [cover.current]);

    return (
        <>
            {
                detailMovie && on &&
                <MoviePopWapper

                    ref={cover}
                >
                    <MoviePop>
                        <div>
                            <img src={detailMovie.large_cover_image} alt="" />
                        </div>
                        <MoviePopDesc>
                            <MoviePopDescTitle>{detailMovie.title}</MoviePopDescTitle>
                            <MoviePopDescDesc>{detailMovie.description_full.substr(0, 400)}</MoviePopDescDesc>
                            <MoviePopDescYear>{detailMovie.year}</MoviePopDescYear>
                            <MoviePopDescGenres>
                                {
                                    detailMovie.genres?.map((it, idx) => {
                                        return <Genre key={idx}>{it}</Genre>
                                    })
                                }
                            </MoviePopDescGenres>
                            <MovieDetailClose onClick={() => setOn(false)}><BsX /></MovieDetailClose>
                        </MoviePopDesc>
                    </MoviePop>
                </MoviePopWapper>
            }Title
        </>
    )
}

const GenreMovie = ({ genre }) => {
    const [genreList, setGenreList] = useState([]);
    const genreMovie = async () => {
        const r = await axios.get(`https://yts.mx/api/v2/list_movies.json?genre=${genre}&limit=12`);
        setGenreList(r.data.data.movies);
    }
    useEffect(() => {
        genreMovie()
    }, [])
    return (
        <GenreMovieWrapper>
            <GenreMovieTitle>{genre}</GenreMovieTitle>
            {/* <Hr /> */}
            <Inner>
                <GridLayout>
                    {
                        genreList.map((it, idx) => {
                            return (
                                <GridItm key={it.id}>
                                    <Link to={`/detail/${it.id}`}>
                                        <Img src={it.large_cover_image}
                                            alt={it.title}
                                            onError={e => e.target.src = `${process.env.PUBLIC_URL}/cover.jpg`}
                                        />
                                        <Title>{it.title_long}</Title>
                                        {
                                            it.summary.length > 10 &&
                                            <Desc>
                                                {it.summary.substr(0, 100)}
                                                {it.summary.length > 100 ? '...' : ''}
                                            </Desc>
                                        }
                                    </Link>

                                </GridItm>
                            )
                        })
                    }
                </GridLayout>
            </Inner>
        </GenreMovieWrapper>
    )
}

const Movie = () => {
    //영화 데이타를 가져오기 (데이터는 시간이 걸리는 일이므로... 비동기식으로 처리한다.)
    //영화데이타를 그리기 state(리액터가 그려줄 수 있게)

    const [movie, setMovie] = useState([]);
    const [movieList, setMovieList] = useState({});
    const [pageNum, setPageNum] = useState(0);
    const [list, setList] = useState(0);
    const [on, setOn] = useState(true);
    const [search, setSearch] = useState([]);
    const [inputList, setInputList] = useState();
    const [input, setInput] = useState('');
    const [load, setLoad] = useState(true);
    //const [genre, setGenre] = useState(GL[0]);

    const GL = [
        "Action",
        "Adventure",
        "Animation",
        "Biography",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "Film Noir",
        "History",
        "Horror",
        "Music",
        "Musical",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Short Film",
        "Sport",
        "Thriller",
        "War",
        "Western"
    ]
    const mainSlide = useRef(null);
    const inputRef = useRef(null);

    const limit = 24; // 50이하임..
    const pageLimit = 20;
    const listNum = Array.from({ length: parseInt(movieList.movie_count / limit) });

    const getMovie = async () => {
        setLoad(true);
        const r = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=${limit}&page=${pageNum}`);
        setMovieList(r.data.data);
        setMovie(r.data.data.movies);
        setLoad(false);
    }
    const searchMovie = async () => {
        const r = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${inputList}`);
        setSearch(r.data.data.movies);
    }



    useEffect(() => {
        getMovie();
    }, [pageNum]);

    useEffect(() => {
        searchMovie();
    }, [inputList]);

    // useEffect(() => {
    //     genreMovie();
    // }, [genre]);


    const searchHandler = e => {
        e.preventDefault();
        if (input.length < 3) {
            alert('더 입력하세요...');
            setInput('');
            inputRef.current.focus();
            return
        }
        setInputList(input);
        console.log(inputList)
    }

    console.log(movie, movieList);

    const MainSlideOption = {
        arrows: false,
        autoplay: true,
        slidesToShow: 5,
    }
    if (load) {
        return <Load><i className="xi-spinner-1 xi-spin"></i></Load>
    }
    return (
        <Wapper>
            <CommonStyle />
            <Header>
                <Logo>
                    <H1>
                        <a href="/react_movie_yts/">About Movie</a>
                    </H1>
                    <MainTitle>All The Movies In The World</MainTitle>
                </Logo>
                <div>
                    <Search>
                        <form onSubmit={searchHandler}>
                            <Input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                ref={inputRef}
                            />
                            <Button>SEARCH</Button>
                        </form>
                    </Search>
                    <InputResult>
                        {
                            search &&
                            search.map(it => {
                                return (
                                    <Link to={`/search/${it.id}`}
                                        onClick={() => setOn(true)}
                                        key={it.id}>
                                        {it.title}
                                    </Link>
                                )

                            })
                        }
                    </InputResult>
                </div>
            </Header>


            {/* MovieSlide */}
            <MovieSlideWrapper>

                <MovieSlide {...MainSlideOption} ref={mainSlide}>
                    {
                        movie.map((it, idx) => {
                            return (
                                <GridItm key={it.id} onClick={() => setOn(true)}>
                                    <Link to={`/detail/${it.id}`}>
                                        <Img src={it.large_cover_image}
                                            alt={it.title}
                                            onError={e => e.target.src = `${process.env.PUBLIC_URL}/cover.jpg`}
                                        />
                                        <Title>{it.title_long}</Title>
                                        {
                                            it.summary.length > 10 &&
                                            <Desc>
                                                {it.summary.substr(0, 100)}
                                                {it.summary.length > 100 ? '...' : ''}
                                            </Desc>
                                        }
                                    </Link>

                                </GridItm>
                            )
                        })
                    }
                </MovieSlide>
                <MovieSlideLeftArrow onClick={() => mainSlide.current.slickPrev()}><BsArrowLeft /></MovieSlideLeftArrow>
                <MovieSlideRightArrow onClick={() => mainSlide.current.slickNext()}><BsArrowRight /></MovieSlideRightArrow>

            </MovieSlideWrapper>



            <Routes>
                <Route path="/" element={null} />
                <Route path="/detail/:id" element={
                    <DetailMovie
                        movie={movie}
                        on={on}
                        setOn={setOn} />
                } />
                <Route path="/search/:id" element={
                    <SearchMovie
                        search={search}
                        on={on}
                        setOn={setOn} />
                } />
            </Routes>



            <ListBtnWrapper>
                {
                    list > 1 &&
                    <ListBtn onClick={() => setList(list - pageLimit)}>PREV</ListBtn>
                }

                {
                    listNum.map((_, idx) => {
                        return <ListBtn onClick={() => setPageNum(idx + 1)} key={idx}>{idx + 1}</ListBtn>
                    }).slice(list, list + pageLimit)
                }
                {
                    list < parseInt(movieList.movie_count / limit) - pageLimit &&
                    <ListBtn onClick={() => setList(list + pageLimit)}>NEXT</ListBtn>
                }
            </ListBtnWrapper>

            <MovieListWrapper>
                <Inner>
                    <GridLayout>
                        {
                            movie.map((it, idx) => {
                                return (
                                    <GridItm key={it.id} onClick={() => setOn(true)}>
                                        <Link to={`/detail/${it.id}`}>
                                            <Img src={it.large_cover_image}
                                                alt={it.title}
                                                onError={e => e.target.src = `${process.env.PUBLIC_URL}/cover.jpg`}
                                            />
                                            <Title>{it.title_long}</Title>
                                            {
                                                it.summary.length > 10 &&
                                                <Desc>
                                                    {it.summary.substr(0, 100)}
                                                    {it.summary.length > 100 ? '...' : ''}
                                                </Desc>
                                            }
                                        </Link>

                                    </GridItm>
                                )
                            })
                        }
                    </GridLayout>
                </Inner>

            </MovieListWrapper>
            {
                GL.map((it, idx) => <GenreMovie genre={it} />)
            }
            <Footer>
                &copy; AM movie
            </Footer>
        </Wapper>
    )
}

export default Movie;