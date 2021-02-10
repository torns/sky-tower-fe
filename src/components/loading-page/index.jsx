import React, { Component }  from 'react';
import { Spin } from 'antd';

export default function LoadingPage() {
    return (
        <div className="spin-container">
            <Spin spinning={true}  tip="Loading..." />
        </div>
    );
}