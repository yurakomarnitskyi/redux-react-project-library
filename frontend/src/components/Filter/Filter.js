import { useDispatch, useSelector } from "react-redux";
import "./Filter.css";
import {
  setTitleFilter,
  setAuthorFilter,
  setfilterOnlyFavorite,
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavorite,
  resetTitleFilter,
} from "../../redux/slices/filterSlices";

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavorite);

  function handlerTitleFilterChange(e) {
    dispatch(setTitleFilter(e.target.value));
  }

  function handleerResteTitle() {
    dispatch(resetTitleFilter());
  }

  function handlerAuthorFilterChange(e) {
    dispatch(setAuthorFilter(e.target.value));
  }

  function handlerFavoriteOnly() {
    dispatch(setfilterOnlyFavorite());
  }

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            value={titleFilter}
            placeholder="Filter by title..."
            onChange={handlerTitleFilterChange}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            value={authorFilter}
            placeholder="Filter by author..."
            onChange={handlerAuthorFilterChange}
          />
        </div>
        <div className="filter-group">
          <input
            type="checkbox"
            checked={onlyFavoriteFilter}
            onChange={handlerFavoriteOnly}
          />
          <label>Only Favorite</label>
        </div>
        <button type="button" onClick={handleerResteTitle}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
