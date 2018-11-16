import { MovieReducer } from '../../src/reducers/MovieReducer'
import { LOG_SEARCH, UPDATE_GENRE, UPDATE_TITLE, UPDATE_FILTER_QUERY, EMPTY_FILTER_ITEMS, UPDATE_SORT_TOGGLE } from '../../src/actions/MovieActionTypes'
let jsonList = [
  {
    movie_id: 507569,
    title: 'The Seven Deadly Sins: Prisoners of the Sky',
    summary: 'Traveling in search of the rare ingredient, “sky fish” Meliodas and Hawk arrive at a palace that floats above the clouds. The people there are busy preparing a ceremony, meant to protect their home from a ferocious beast that awakens once every 3,000 years. But before the ritual is complete, the Six Knights of Black—a Demon Clan army—removes the seal on the beast, threatening the lives of everyone in the Sky Palace.',
    popularity: '190.736',
    language: 'ja',
    release_date: '2018-08-18',
    poster_path: '/r6pPUVUKU5eIpYj4oEzidk5ZibB.jpg',
    comment: '',
    rating: '5.9'
  },
  {
    movie_id: 346910,
    title: 'The Predator',
    summary: 'From the outer reaches of space to the small-town streets of suburbia, the hunt comes home. Now, the universe’s most lethal hunters are stronger, smarter and deadlier than ever before, having genetically upgraded themselves with DNA from other species. When a young boy accidentally triggers their return to Earth, only a ragtag crew of ex-soldiers and a disgruntled science teacher can prevent the end of the human race.',
    popularity: '163.789',
    language: 'en',
    release_date: '2018-09-13',
    poster_path: '/wMq9kQXTeQCHUZOG4fAe5cAxyUA.jpg',
    comment: '',
    rating: '5.3'
  }]
let sortedJson = [
  {
    movie_id: 346910,
    title: 'The Predator',
    summary: 'From the outer reaches of space to the small-town streets of suburbia, the hunt comes home. Now, the universe’s most lethal hunters are stronger, smarter and deadlier than ever before, having genetically upgraded themselves with DNA from other species. When a young boy accidentally triggers their return to Earth, only a ragtag crew of ex-soldiers and a disgruntled science teacher can prevent the end of the human race.',
    popularity: '163.789',
    language: 'en',
    release_date: '2018-09-13',
    poster_path: '/wMq9kQXTeQCHUZOG4fAe5cAxyUA.jpg',
    comment: '',
    rating: '5.3'
  },
  {
    movie_id: 507569,
    title: 'The Seven Deadly Sins: Prisoners of the Sky',
    summary: 'Traveling in search of the rare ingredient, “sky fish” Meliodas and Hawk arrive at a palace that floats above the clouds. The people there are busy preparing a ceremony, meant to protect their home from a ferocious beast that awakens once every 3,000 years. But before the ritual is complete, the Six Knights of Black—a Demon Clan army—removes the seal on the beast, threatening the lives of everyone in the Sky Palace.',
    popularity: '190.736',
    language: 'ja',
    release_date: '2018-08-18',
    poster_path: '/r6pPUVUKU5eIpYj4oEzidk5ZibB.jpg',
    comment: '',
    rating: '5.9'
  }]

describe('search form reducer', () => {
  it('should return the initial state', () => {
    expect(MovieReducer(undefined, {})).toEqual(
      {
        title: '',
        searchHistory: [],
        items: [],
        loading: false,
        error: null,
        nextPage: 0,
        filterQuery: '',
        filterItems: [],
        toggleSort: 'grey'
      }
    )
  })
  it('should handle UPDATE_TITLE', () => {
    expect(
      MovieReducer({}, {
        type: UPDATE_TITLE,
        title: 'Batman'
      })
    ).toEqual(
      {
        title: 'Batman'
      }
    )
    expect(
      MovieReducer(
        {
          title: 'Batman'
        }
        ,
        {
          type: UPDATE_TITLE,
          title: 'Spiderman'
        }
      )
    ).toEqual(
      {
        title: 'Spiderman'
      })
  })

  it('should handle LOG_SEARCH', () => {
    expect(
      MovieReducer({ searchHistory: [] }, {
        type: LOG_SEARCH,
        title: 'Avengers'
      })
    ).toEqual(
      {
        searchHistory: [{
          searchedTitle: 'Avengers'
        }]
      }
    )
  })
})

it('should handle UPDATE_FILTER_QUERY', () => {
  expect(
    MovieReducer({ items: [], filterQuery: 'The', filterItems: [] }, {
      type: UPDATE_FILTER_QUERY,
      payload: 'The'
    })
  ).toEqual(
    {
      filterQuery: 'The',
      filterItems: [],
      items: []
    }
  )
})
it('should handle UPDATE_FILTER_QUERY with movies in item-list', () => {
  expect(
    MovieReducer({ items: jsonList, filterQuery: 'The Predator', filterItems: [] }, {
      type: UPDATE_FILTER_QUERY,
      payload: 'The Predator'
    })
  ).toEqual(
    {
      filterQuery: 'The Predator',
      filterItems: [],
      items: jsonList
    }
  )
})
it('should handle EMPTY_FILTER_ITEMS', () => {
  expect(
    MovieReducer({ filterQuery: 'The' }, {
      type: EMPTY_FILTER_ITEMS
    })
  ).toEqual(
    {
      filterQuery: ''
    }
  )
})
it('should handle UPDATE_SORT_TOGGLE when filterItem.length > 0 og toggleSort = grey', () => {
  expect(
    MovieReducer({ toggleSort: 'green', filterItems: jsonList }, {
      type: UPDATE_SORT_TOGGLE
    })
  ).toEqual(
    {
      filterItems: sortedJson,
      toggleSort: 'red'
    }
  )
})
it('should handle UPDATE_SORT_TOGGLE ', () => {
  expect(
    MovieReducer({ toggleSort: 'grey', filterItems: jsonList }, {
      type: UPDATE_SORT_TOGGLE
    })
  ).toEqual(
    {
      filterItems: sortedJson.reverse(),
      toggleSort: 'green'
    }
  )
})
it('should handle UPDATE_SORT_TOGGLE when filterItem.length < 0', () => {
  expect(
    MovieReducer({ toggleSort: 'grey', filterItems: [] }, {
      type: UPDATE_SORT_TOGGLE
    })
  ).toEqual(
    {
      toggleSort: 'grey',
      filterItems: []
    }
  )
})
it('should handle UPDATE_SORT_TOGGLE when filterItem.length < 0 and toggleFilter ===green', () => {
  expect(
    MovieReducer({ toggleSort: 'green', filterItems: [] }, {
      type: UPDATE_SORT_TOGGLE
    })
  ).toEqual(
    {
      toggleSort: 'grey',
      filterItems: []
    }
  )
})
