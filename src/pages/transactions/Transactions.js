import { fetchTransactions } from '../../features/transactions/transactionsSlice';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import styles from './Transactions.module.scss';

const TRANSACTIONS_PER_PAGE = 5;

function Transactions() {
  const [hasPagination, setHasPagination] = useState(false);
  const [currentPage, setCurrentpage] = useState(1);
  const { page } = useParams();
  const { data: transactions } = useSelector((state) => state.transactions);
  const { fetched } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const getTotalOfPages = useCallback(() => {
    return Math.ceil(transactions.length / TRANSACTIONS_PER_PAGE);
  }, [transactions]);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchTransactions());
    }
  }, [dispatch, fetched]);

  useEffect(() => {
    if (transactions.length > TRANSACTIONS_PER_PAGE) {
      setHasPagination(true);
    }
  }, [transactions]);

  useEffect(() => {
    if (page && page <= getTotalOfPages()) {
      setCurrentpage(parseInt(page, 10));
    }
  }, [page, getTotalOfPages]);

  const renderRows = useCallback(() => {
    const pageTransactions = transactions.reduce(
      (resultArray, transaction, index) => {
        const chunkIndex = Math.floor(index / TRANSACTIONS_PER_PAGE);

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }

        resultArray[chunkIndex].push(transaction);

        return resultArray;
      },
      [],
    );

    return pageTransactions[currentPage - 1].map(
      ({ beneficiary, accountNumber, amount, currency, paymentDetails }, i) => (
        <tr key={window.btoa(`${i}_${accountNumber}`)}>
          <td>{beneficiary}</td>
          <td>{accountNumber}</td>
          <td>{amount}</td>
          <td>{currency}</td>
          <td>{paymentDetails}</td>
        </tr>
      ),
    );
  }, [transactions, currentPage]);

  const renderPaginationButtons = () => {
    const pages = [...Array(getTotalOfPages() + 1).keys()].slice(1);

    return pages.map((pageNumber) => (
      <li
        key={window.btoa(pageNumber)}
        className={classnames('page-item', {
          active: pageNumber === currentPage,
        })}
        onClick={() => setCurrentpage(pageNumber)}
      >
        <button className="page-link">{pageNumber}</button>
      </li>
    ));
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className={classnames(styles['page-title'], 'display-6')}>
              Transactions
            </h1>
            <div
              className={classnames(
                styles['table-wrapper'],
                'table-responsive',
                { [styles['not-found']]: transactions.length === 0 },
              )}
            >
              {transactions.length === 0 ? (
                <div>No transactions found</div>
              ) : (
                <table className={classnames(styles['table'], 'table')}>
                  <thead>
                    <tr>
                      <th scope="col">Beneficiary</th>
                      <th scope="col">Account Number</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Currency</th>
                      <th scope="col" className={styles['th-payment-details']}>
                        Payment details
                      </th>
                    </tr>
                  </thead>
                  <tbody>{renderRows()}</tbody>
                </table>
              )}
            </div>
            {hasPagination && (
              <nav aria-label="Page navigation example">
                <ul className={classnames('pagination', styles['pagination'])}>
                  <li
                    className={classnames('page-item', {
                      disabled: currentPage === 1,
                    })}
                  >
                    <button
                      className={'page-link'}
                      onClick={() => setCurrentpage(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {renderPaginationButtons()}
                  <li
                    className={classnames('page-item', {
                      disabled: currentPage === getTotalOfPages(),
                    })}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentpage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
