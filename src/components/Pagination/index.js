import React from 'react';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodoItemsByPageNumber } from '../../redux/todos/actions';
import { selectTodoItems, totalCountSelector, recordPerPageSelector, currentPageSelector } from '../../redux/todos/selectors';

function Pagination() {
  // useSelector hook

  const paginationData = useSelector((store) => ({
    todoItems: selectTodoItems(store),
    total: totalCountSelector(store),
    recordPerPage: recordPerPageSelector(store),
    currentPage: currentPageSelector(store),
  }));

  const { todoItems, total, recordPerPage, currentPage } = paginationData;

  // useDispatch hook

  const dispatch = useDispatch();

  const fetchTodosByPageNum = (number) => {
    dispatch(fetchTodoItemsByPageNumber(number));
  };

  if (todoItems?.length < 1) {
    return null;
  }
  const pageNumbers = [];
  const numberOfPages = Math.ceil(total / recordPerPage);
  for (let pageNum = 1; pageNum <= numberOfPages; pageNum++) {
    pageNumbers.push(pageNum);
  }

  const goToPreviousPage = () => {
    if (currentPage === 1) {
      return;
    }
    dispatch(fetchTodoItemsByPageNumber(currentPage - 1));
  };

  const goToNextPage = () => {
    if (currentPage === numberOfPages) {
      return;
    }
    dispatch(fetchTodoItemsByPageNumber(currentPage + 1));
  };

  return (
    <ul className="paginatedButtons">
      <Button onClick={goToPreviousPage} color="secondary" variant="contained">
        previous
      </Button>
      {pageNumbers.map((pageNumber) => (
        <li
          onClick={() => fetchTodosByPageNum(pageNumber)}
          className={`${pageNumber === currentPage ? 'active' : ''}`}
          key={pageNumber}
        >
          {pageNumber}
        </li>
      ))}
      <Button color="secondary" variant="contained" onClick={goToNextPage}>
        next
      </Button>
    </ul>
  );
}

export default Pagination;
