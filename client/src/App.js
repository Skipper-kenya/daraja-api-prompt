import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { toast, Toaster } from "sonner";

import { Input, Button, Space } from "antd";
import { Money, PhoneCall } from "phosphor-react";

function App() {
  const [phone, setPhone] = useState(null);
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const handlePrompt = async () => {
    if (phone && amount) {
      setLoading(true);
      const response = await axios.post(process.env.REACT_APP_STK_PUSH_API, {
        phone: Number(phone),
        amount: Number(amount),
      });
      setLoading(false);
      const { success, message } = response.data;
    } else {
      setLoading(false);
      toast.error("phone and amount required!");
    }
  };

  return (
    <div className="stk-wrapper">
      <Toaster richColors position="top-center" />
      <h3>Tip Andrew stk-push</h3>
      <div className="stk">
        <Space direction="vertical" className="space">
          <Input
            addonBefore="254"
            defaultValue="7"
            size="large"
            type="number"
            onChange={(e) => setPhone(e.target.value)}
            prefix={<PhoneCall />}
          />
          <Input
            addonBefore={<Money />}
            size="large"
            type="number"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            size="large"
            block
            type="primary"
            onClick={handlePrompt}
            loading={loading}
          >
            Submit
          </Button>
        </Space>
      </div>
    </div>
  );
}
export default App;
