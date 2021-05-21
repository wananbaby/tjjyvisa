import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Row, Col, Divider, Tooltip } from "antd";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";
import { MailOutlined, QqOutlined, LineChartOutlined } from "@ant-design/icons";
import { changeTabAndSetCookie } from "../redux/visastatusTabSlice";
import { nonDomesticEmbassyInDefaultFilterSelector } from "../redux/selectors";
import VisaStatusOverviewList from "./VisaStatusOverviewList";
import EmbassySelector from "./EmbassySelector";
import EmailSubscription from "./EmailSubscription";
import "./VisaStatusTabs.less";
import { OverviewChartByMinute } from "./VisaStatusOverviewList/OverviewChart";

const { TabPane } = Tabs;

export default function VisaStatusTabs() {
    const [t] = useTranslation();
    const dispatch = useDispatch();
    const visaType = useSelector(state => state.visastatusTab);
    const visaTypeDetails = useSelector(state => state.metadata.visaTypeDetails);
    const [func, setFunc] = useState("chart");

    return (
        <>
            <Tabs
                activeKey={visaType}
                onChange={activeKey => dispatch(changeTabAndSetCookie(activeKey))}
                type="card"
                size="large"
                renderTabBar={(props, DefaultTabBar) => <DefaultTabBar {...props} className="autofill-tab-bar" />}
            >
                {Array.from("FJBHOL").map(vt => (
                    <TabPane key={vt} tab={visaTypeDetails[vt]} style={{ flexGrow: 1 }} />
                ))}
            </Tabs>
            <Row gutter={[16, { xs: 16, md: 32 }]}>
                <Col span={24}>
                    <EmbassySelector visaType={visaType} />
                </Col>
                <Col span={24}>
                    <Tabs
                        activeKey={visaType !== "F" && visaType !== "J" && func === "qqtg" ? "chart" : func}
                        onChange={activeKey => setFunc(activeKey)}
                        tabPosition="top"
                        centered
                    >
                        <TabPane
                            tab={
                                <Tooltip title={t("overMinuteChartTitle")}>
                                    <LineChartOutlined />
                                    {t("overMinuteChartTitleShort")}
                                </Tooltip>
                            }
                            key={"chart"}
                        >
                            <OverviewChartByMinute visaType={visaType} />
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span={24}>
                    <VisaStatusOverviewList visaType={visaType} />
                </Col>
            </Row>
        </>
    );
}
