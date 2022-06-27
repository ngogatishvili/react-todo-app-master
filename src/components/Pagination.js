import React,{useState} from 'react';
import {Button} from '@mui/material';
import axios from 'axios';
import { useAppContext } from '../context/appContext';




export const Pagination = () => {
  const {todoItems,recordPerPage,totalCount,fetchPaginatedItemsByPageNumber,currentPage}=useAppContext();

  if (todoItems.length < 1) {
    return null;
  }
  const pageNumbers = [];
  const numberOfPages = Math.ceil(totalCount / recordPerPage);
  for (let pageNum = 1; pageNum <= numberOfPages; pageNum++) {
    pageNumbers.push(pageNum);
  }

 
  const goToPreviousPage = () => {
    if (currentPage === 1) {
      return;
    }
    fetchPaginatedItemsByPageNumber(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage === numberOfPages) {
      return;
    }
    fetchPaginatedItemsByPageNumber(currentPage + 1);
  };

  return (
    <ul className='paginatedButtons'>
      <Button color='secondary' variant='contained' onClick={goToPreviousPage}>
        previous
      </Button>
      {pageNumbers.map((pageNumber) => {
        return (
          <li
            onClick={() => fetchPaginatedItemsByPageNumber(pageNumber)}
            className={`${pageNumber === currentPage ? 'active' : ''}`}
            key={pageNumber}>
            {pageNumber}
          </li>
        );
      })}
      <Button color='secondary' variant='contained' onClick={goToNextPage}>
        next
      </Button>
    </ul>
  );
};

export default Pagination;