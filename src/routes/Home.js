import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  }

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get('https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating');

    // this.setState({ movies: movies })를 아래와 같이 축약 가능, 키와 대입할 변수의 이름이 같기 때문 ES6, 앞은 state 뒤는 axios.get()의 결과를 담을 변수
    this.setState({ movies, isLoading: false });
  }
  componentDidMount() {
    //영화데이터 로딩
    // axios로 API를 호출
    //component가 mount되면 axios.get()함수가 실행되며 영화데이터를 가져온다.
    this.getMovies();
  }

  render() {
    // 구조분해할당으로 this.state에 있는 isLoading을 우선 얻으면 항상 this.state를 입력하지 않아도 된다.
    const { isLoading, movies } = this.state;

    return (
    <section className="container">
      {isLoading ? (
      <div className="loader">
        <span className="lodader__text">Loading...</span>
      </div>
      )  : (
        <div className="movies">
       {movies.map(movie => (
      // console.log(movie);
      // return (
        <Movie
        key={movie.id}
          id={movie.id}
          year={movie.year}
          title={movie.title}
          summary={movie.summary}
          poster={movie.medium_cover_image}
          genres={movie.genres}
        />
      ))}
    </div>
      )}
    </section>
    );
  }
}

export default App;
