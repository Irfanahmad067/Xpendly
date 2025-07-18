import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../components/DefaultLayout";
import "../resources/transaction.css";
import { AddEditTransaction } from "../components/AddEditTransaction.js";
import axios from "axios";
import { DatePicker, message, Select, Table } from "antd";
import Spinner from "../components/Spinner.js";
import moment from "moment";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Analytics from "../components/Analytics.js";
const { RangePicker } = DatePicker;


export const Home = () => {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedRange, setSelectedRange] = useState([]);
  const [type, setType] = useState("all");
  const [viewType, setViewType] = useState("table");
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  const getTransactions = async () => {
    const url = process.env.REACT_APP_BACKEND_URL;
    try {
      const user = JSON.parse(localStorage.getItem("track-it-user"));
      
      setLoading(true);
      const response = await axios.post(
        `${url}/api/transactions/get-all-transactions`,
        { userId: user._id, frequency, ...(frequency === "custom" && {selectedRange}), type }
      );
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      message.error("something went wrong");
    }
  };


  const deleteTransaction = async (record) => {
    const url = process.env.REACT_APP_BACKEND_URL;
    try {
      setLoading(true);
       await axios.post(
        `${url}/api/transactions/delete-transaction`,
        {
         transactionId : record._id
        }
      );
      message.success("Transaction Deleted Successfully");
      getTransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      message.error("something went wrong");
    }
  };

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (record)=> <lable>{moment(record.date).format('DD-MM-YYYY')}</lable>
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render : (text, record)=>{
        return <div>
          <EditOutlined onClick={()=>{
            setSelectedItemForEdit(record)
            setShowAddEditTransactionModal(true)

          }}/>
          <DeleteOutlined className="mx-3" onClick={()=>deleteTransaction(record)}/>
        </div>
      }


    }
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>

            {frequency === "custom" && (
              <div className="mt-2">
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
        </div>

        <div className="d-flex">
          <div>
            <div className="view-switch mx-5">
              <UnorderedListOutlined
                className={` mx-3 ${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("table")}
                size={30}
              />
              <AreaChartOutlined
                className={`${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                }`}
                onClick={() => setViewType("analytics")}
                size={30}
              />
            </div>
          </div>

          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>

      <div className="table-analtics">
        {viewType === "table" ? (
          <div className="table">
            <Table columns={columns} dataSource={transactionsData} />
          </div>
        ) : (
          <Analytics transactions={transactionsData} />
        )}
      </div>

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedItemForEdit={selectedItemForEdit}
          getTransactions={getTransactions}
          setSelectedItemForEdit={setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
};
