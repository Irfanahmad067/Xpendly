 import React, { useState } from 'react'
 import { Form, Input, message, Modal, Select } from "antd";
import Spinner from './Spinner';
import axios from 'axios';
 
 export const AddEditTransaction = (
  { showAddEditTransactionModal,
   setShowAddEditTransactionModal,
   selectedItemForEdit,
   getTransactions,
   setSelectedItemForEdit
  }
 ) => {
   const [loading, setLoading] = useState(false);
   const onFinish = async (values) => {
     try {
      const user = JSON.parse(localStorage.getItem("track-it-user"));
      const url = process.env.REACT_APP_BACKEND_URL;

      /// for edit transaction
      if(selectedItemForEdit){
        setLoading(true);
        await axios.post(`${url}/api/transactions/edit-transaction`, {
          payload:{
            ...values,
            userId: user._id,
          },
          transactionId: selectedItemForEdit._id,
        });
        getTransactions();
        message.success("Transaction Updated Successfully");

      }
      else{            /// adding new transaction
        setLoading(true);
        await axios.post(`${url}/api/transactions/add-transaction`, {
          ...values,
          userId: user._id,
        });
        getTransactions();
        message.success("Transaction Added Successfully");
      }
      
       setShowAddEditTransactionModal(false);
       setSelectedItemForEdit(null)

     } catch (error) {
       setLoading(false);
       message.error("something went wrong");
     }
   };
   return (
     <Modal
       title={selectedItemForEdit ? "Edit Transaction" : "Add New Transaction"}
       visible={showAddEditTransactionModal}
       onCancel={() => setShowAddEditTransactionModal(false)}
       footer={false}
     >
       {loading && <Spinner />}
       <Form layout="vertical" className="transaction-form" onFinish={onFinish} initialValues={selectedItemForEdit}>
         <Form.Item label="Amount" name="amount">
           <Input type="text" />
         </Form.Item>

         <Form.Item label="Type" name="type">
           <Select>
             <Select.Option value="income">Income</Select.Option>
             <Select.Option value="expense">Expense</Select.Option>
           </Select>
         </Form.Item>

         <Form.Item label="Category" name="category">
           <Select>
             <Select.Option value="salary">Salary</Select.Option>
             <Select.Option value="rent">Rent</Select.Option>
             <Select.Option value="food">Food</Select.Option>
             <Select.Option value="transportation">
               Transportation
             </Select.Option>
             <Select.Option value="entertainment">Entertainment</Select.Option>
             <Select.Option value="medical">Medical</Select.Option>
             <Select.Option value="investment">Investment</Select.Option>
             <Select.Option value="other">Other</Select.Option>
           </Select>
         </Form.Item>

         <Form.Item label="Date" name="date">
           <Input type="date" />
         </Form.Item>

         <Form.Item label="Reference" name="reference">
           <Input type="text" />
         </Form.Item>

         <Form.Item label="Description" name="description">
           <Input type="text" />
         </Form.Item>

         <div className="d-flex justify-content-end">
           <button className="primary" type="submit">
             SAVE
           </button>
         </div>
       </Form>
     </Modal>
   );
 };
 