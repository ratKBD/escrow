import styles from "./TransactionDataTable.module.css";

const TransactionDataTable = ({ className = "" }) => {
  return (
    <div className={[styles.transactionDataTable, className].join(" ")}>
      <div className={styles.top}>
        <div className={styles.latestAccountTransactionParent}>
          <div className={styles.availableBalance}>
            Latest Account Transaction
          </div>
          <div className={styles.textFieldParent}>
            <div className={styles.textField}>
              <div className={styles.content2}>
                <img
                  className={styles.leadingIcon}
                  alt=""
                  src="/leadingicon.svg"
                />
                <div className={styles.labelText}>Search...</div>
                <div className={styles.labelText1}>Search...</div>
              </div>
              <img className={styles.trailingIcon} alt="" src />
              <div className={styles.supportingText}>
                <div className={styles.supportingText1}>Supporting text</div>
              </div>
            </div>
            <div className={styles.filterLinesParent}>
              <img
                className={styles.filterLinesIcon}
                alt=""
                src="/filterlines.svg"
              />
              <div className={styles.input1}>Filter</div>
            </div>
            <div className={styles.download01Parent}>
              <img
                className={styles.filterLinesIcon}
                alt=""
                src="/download01.svg"
              />
              <div className={styles.input1}>Export</div>
            </div>
            <div className={styles.reLoadTable}>
              <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
            </div>
          </div>
        </div>
        <div className={styles.topChild} />
      </div>
      <div className={styles.heading}>
        <div className={styles.vectorWrapper}>
          <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
        </div>
        <div className={styles.dateWrapper}>
          <div className={styles.contactName}>Date</div>
        </div>
        <div className={styles.contactNameWrapper}>
          <div className={styles.contactName}>Contact Name</div>
        </div>
        <div className={styles.debitWrapper}>
          <div className={styles.contactName}>Debit</div>
        </div>
        <div className={styles.creditWrapper}>
          <div className={styles.contactName}>Credit</div>
        </div>
        <div className={styles.acBalanceWrapper}>
          <div className={styles.contactName}>A/c Balance</div>
        </div>
        <div className={styles.utrbankrrnWrapper}>
          <div className={styles.contactName}>UTR/BANKRRN</div>
        </div>
        <div className={styles.acNoUpiWrapper}>
          <div className={styles.contactName}>A/c No /UPI</div>
        </div>
      </div>
      <div className={styles.dataTable}>
        <div className={styles.frameParent5}>
          <div className={styles.frameParent6}>
            <div className={styles.vectorContainer}>
              <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
            </div>
            <div className={styles.vectorContainer}>
              <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
            </div>
            <div className={styles.vectorContainer}>
              <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
            </div>
            <div className={styles.vectorContainer}>
              <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
            </div>
            <div className={styles.vectorContainer}>
              <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
            </div>
            <div className={styles.vectorContainer}>
              <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
            </div>
            <div className={styles.vectorContainer}>
              <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
            </div>
            <div className={styles.vectorContainer}>
              <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
            </div>
            <div className={styles.vectorContainer}>
              <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
            </div>
            <div className={styles.vectorContainer}>
              <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
            </div>
          </div>
          <div className={styles.frameParent7}>
            <div className={styles.wrapper}>
              <div className={styles.acno}>06/08/2022</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>06/08/2022</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>06/08/2022</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>06/08/2022</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>06/08/2022</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>06/08/2022</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>06/08/2022</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>06/08/2022</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>06/08/2022</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>06/08/2022</div>
            </div>
          </div>
          <div className={styles.frameParent8}>
            <div className={styles.nithinPrakashWrapper}>
              <div className={styles.acno}>Nithin Prakash</div>
            </div>
            <div className={styles.nithinPrakashWrapper}>
              <div className={styles.acno}>Parag Jayaram</div>
            </div>
            <div className={styles.nithinPrakashWrapper}>
              <div className={styles.acno}>Prasanth</div>
            </div>
            <div className={styles.nithinPrakashWrapper}>
              <div className={styles.acno}>Ratheesh Vijayan</div>
            </div>
            <div className={styles.nithinPrakashWrapper}>
              <div className={styles.acno}>Vaidhav Srivastava</div>
            </div>
            <div className={styles.nithinPrakashWrapper}>
              <div className={styles.acno}>Nethaji</div>
            </div>
            <div className={styles.nithinPrakashWrapper}>
              <div className={styles.acno}>Guru Prasad</div>
            </div>
            <div className={styles.nithinPrakashWrapper}>
              <div className={styles.acno}>Srimathi Srinivasan</div>
            </div>
            <div className={styles.nithinPrakashWrapper}>
              <div className={styles.acno}>Anusree Vinod</div>
            </div>
            <div className={styles.nithinPrakashWrapper}>
              <div className={styles.acno}>Srihari</div>
            </div>
          </div>
          <div className={styles.frameParent9}>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹5,00,000</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹2,80,28,900</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹7,000</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹19,28,000</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹200</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹88,000</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹10</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹2</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹8,00,763</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹28,020</div>
            </div>
          </div>
          <div className={styles.frameParent10}>
            <div className={styles.wrapper18}>
              <div className={styles.acno}>₹5,00,000</div>
            </div>
            <div className={styles.wrapper18}>
              <div className={styles.acno}>₹2,80,28,900</div>
            </div>
            <div className={styles.wrapper18}>
              <div className={styles.acno}>₹7,000</div>
            </div>
            <div className={styles.wrapper18}>
              <div className={styles.acno}>₹19,28,000</div>
            </div>
            <div className={styles.wrapper18}>
              <div className={styles.acno}>₹200</div>
            </div>
            <div className={styles.wrapper18}>
              <div className={styles.acno}>₹88,000</div>
            </div>
            <div className={styles.wrapper18}>
              <div className={styles.acno}>₹10</div>
            </div>
            <div className={styles.wrapper18}>
              <div className={styles.acno}>₹2</div>
            </div>
            <div className={styles.wrapper18}>
              <div className={styles.acno}>₹8,00,763</div>
            </div>
            <div className={styles.wrapper18}>
              <div className={styles.acno}>₹28,020</div>
            </div>
          </div>
          <div className={styles.frameParent11}>
            <div className={styles.wrapper}>
              <div className={styles.acno}>₹11,86,31,546</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹31,546</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹546</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹19,28,000</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>₹11,86,31,546.28</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹8,00,763</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹10</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹2</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹28,020</div>
            </div>
            <div className={styles.wrapper8}>
              <div className={styles.acno}>₹8,00,763</div>
            </div>
          </div>
          <div className={styles.frameParent12}>
            <div className={styles.wrapper}>
              <div className={styles.acno}>SBIN5342835383654</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>SBIN5342835383654</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>SBIN5342835383654</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>SBIN5342835383654</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>SBIN5342835383654</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>SBIN5342835383654</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>SBIN5342835383654</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>SBIN5342835383654</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>SBIN5342835383654</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>SBIN5342835383654</div>
            </div>
          </div>
          <div className={styles.frameParent13}>
            <div className={styles.wrapper}>
              <div className={styles.acno}>31492203328456</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>31492203328456</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>31492203328456</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>31492203328456</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>31492203328456</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>31492203328456</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>31492203328456</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>31492203328456</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>31492203328456</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.acno}>31492203328456</div>
            </div>
          </div>
          <div className={styles.frameChild} />
          <div className={styles.frameItem} />
          <div className={styles.frameInner} />
          <div className={styles.lineDiv} />
          <div className={styles.frameChild1} />
          <div className={styles.frameChild2} />
          <div className={styles.frameChild3} />
          <div className={styles.frameChild4} />
          <div className={styles.frameChild5} />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.rowsPerPageParent}>
          <div className={styles.rowsPerPage}>Rows per page:</div>
          <div className={styles.acno}>10</div>
          <img
            className={styles.alertCircleIcon}
            alt=""
            src="/arrowdropdown.svg"
          />
        </div>
        <div className={styles.accountDetailsParent}>
          <div className={styles.acno}>1-10 of 20</div>
          <img className={styles.groupIcon} alt="" src="/group-37.svg" />
        </div>
      </div>
    </div>
  );
};

export default TransactionDataTable;
