// Monitoring, Logging, and Remediation - Implement metrics, alarms, and filters by using AWS monitoring and logging services

export const sysOpsMonitoringLogging = [
    {
        id: 1,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "Collect and monitor logs using CloudWatch Logs",
        question: "What is the maximum size of a single CloudWatch Logs event?",
        options: [
            "A. 256 KB",
            "B. 128 KB",
            "C. 1 MB",
            "D. 64 KB"
        ],
        answer: "A. 256 KB",
        explanation: "The maximum size of a single CloudWatch Logs event is 256 KB. Larger log events will be truncated."
    },
    {
        id: 2,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "CloudTrail vs CloudWatch Logs",
        question: "Which of the following is a key difference between AWS CloudTrail and AWS CloudWatch Logs?",
        options: [
            "A. CloudTrail captures API calls, while CloudWatch Logs captures system and application logs.",
            "B. CloudWatch Logs captures API calls, while CloudTrail captures system and application logs.",
            "C. Both services capture API calls.",
            "D. CloudWatch Logs is only available for EC2 instances."
        ],
        answer: "A. CloudTrail captures API calls, while CloudWatch Logs captures system and application logs.",
        explanation: "CloudTrail is used to capture API calls made within the AWS environment, while CloudWatch Logs collects system and application log data."
    },
    {
        id: 3,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "Querying logs with CloudWatch Logs Insights",
        question: "Which query language is used in CloudWatch Logs Insights for log analysis?",
        options: [
            "A. SQL",
            "B. JSON",
            "C. AWS CLI",
            "D. A SQL-like query language specific to CloudWatch Logs Insights"
        ],
        answer: "D. A SQL-like query language specific to CloudWatch Logs Insights",
        explanation: "CloudWatch Logs Insights provides a powerful query language similar to SQL that allows users to analyze log data interactively."
    },
    {
        id: 4,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "Exporting logs to S3",
        question: "What is the primary method to export CloudWatch Logs to Amazon S3?",
        options: [
            "A. Create a VPC Endpoint",
            "B. Use the 'Export to S3' option in the CloudWatch Console",
            "C. Set up a CloudTrail event",
            "D. Use Amazon SNS"
        ],
        answer: "B. Use the 'Export to S3' option in the CloudWatch Console",
        explanation: "CloudWatch Logs can be exported to S3 using the 'Export to S3' feature, enabling long-term storage or further analysis."
    },
    {
        id: 5,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "AWS CloudTrail",
        question: "Which of the following log data is captured by AWS CloudTrail?",
        options: [
            "A. Data plane events such as file reads in S3",
            "B. Only errors occurring in applications",
            "C. API calls made within an AWS account",
            "D. EC2 instance logs"
        ],
        answer: "C. API calls made within an AWS account",
        explanation: "AWS CloudTrail captures API calls made in an AWS account, which helps in auditing and tracking account activity."
    },
    {
        id: 6,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "CloudWatch Agent Setup",
        question: "Which file format is used to configure the CloudWatch agent for custom log and metric collection?",
        options: [
            "A. YAML",
            "B. JSON",
            "C. XML",
            "D. CSV"
        ],
        answer: "B. JSON",
        explanation: "The CloudWatch agent configuration file uses the JSON format to define which logs and metrics are to be collected."
    },
    {
        id: 7,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "CloudWatch Agent Installation",
        question: "Which method is the most appropriate for installing the CloudWatch agent on an EC2 instance?",
        options: [
            "A. Use EC2 user data",
            "B. Manually SSH into the instance and install it",
            "C. Use Systems Manager Run Command to install the agent",
            "D. Use AWS Lambda"
        ],
        answer: "C. Use Systems Manager Run Command to install the agent",
        explanation: "AWS Systems Manager Run Command can be used to install the CloudWatch agent across multiple instances without manual SSH access."
    },
    {
        id: 8,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "CloudWatch Agent Configuration",
        question: "What is the most efficient way to deploy a CloudWatch Agent configuration file across multiple EC2 instances?",
        options: [
            "A. Use CloudFormation",
            "B. Manually copy the configuration file to each instance",
            "C. Use AWS Systems Manager Parameter Store and Run Command",
            "D. Create a custom AMI with the CloudWatch Agent pre-installed"
        ],
        answer: "C. Use AWS Systems Manager Parameter Store and Run Command",
        explanation: "By storing the CloudWatch Agent configuration file in Parameter Store and using Run Command, you can efficiently deploy it across multiple instances."
    },

    // Create CloudWatch alarms
    {
        id: 9,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "Creating CloudWatch Alarms",
        question: "Which of the following can trigger a CloudWatch Alarm?",
        options: [
            "A. High latency in Route 53",
            "B. CPU utilization exceeding 80%",
            "C. An EC2 instance reboot",
            "D. The creation of a new IAM user"
        ],
        answer: "B. CPU utilization exceeding 80%",
        explanation: "CloudWatch Alarms can be triggered by crossing thresholds of metrics, such as CPU utilization, that are being monitored in CloudWatch."
    },
    {
        id: 10,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "CloudWatch Alarms States",
        question: "What are the possible states of a CloudWatch Alarm?",
        options: [
            "A. Normal, Warning, Error",
            "B. Active, Standby, Offline",
            "C. OK, ALARM, INSUFFICIENT_DATA",
            "D. Up, Down, Maintenance"
        ],
        answer: "C. OK, ALARM, INSUFFICIENT_DATA",
        explanation: "CloudWatch Alarms can exist in three states: OK (when the monitored metric is within the threshold), ALARM (when it breaches the threshold), and INSUFFICIENT_DATA (when there isn’t enough data)."
    },
    {
        id: 11,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "CloudWatch Alarm Actions",
        question: "Which of the following actions can a CloudWatch Alarm trigger when a threshold is breached?",
        options: [
            "A. Send a message to an SQS queue",
            "B. Execute an EC2 Auto Scaling policy",
            "C. Restart the AWS Management Console",
            "D. Stop an RDS instance"
        ],
        answer: "B. Execute an EC2 Auto Scaling policy",
        explanation: "CloudWatch Alarms can trigger Auto Scaling policies, send notifications, or invoke Lambda functions based on the alarm state."
    },
    {
        id: 12,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "Metric Filters",
        question: "Which service allows you to create metric filters to turn log data into CloudWatch metrics?",
        options: [
            "A. AWS CloudTrail",
            "B. AWS CloudWatch",
            "C. AWS Trusted Advisor",
            "D. AWS Config"
        ],
        answer: "B. AWS CloudWatch",
        explanation: "Metric filters allow you to extract metric data from log events and store it in CloudWatch Metrics."
    },
    {
        id: 13,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "CloudWatch Dashboards",
        question: "Which of the following statements is true about CloudWatch Dashboards?",
        options: [
            "A. They can display data only for one AWS region.",
            "B. They can display multiple widgets, including graphs, for any AWS region.",
            "C. They can only show system logs.",
            "D. They are automatically created for every AWS account."
        ],
        answer: "B. They can display multiple widgets, including graphs, for any AWS region.",
        explanation: "CloudWatch Dashboards are customizable and can display widgets from multiple AWS regions for easy monitoring."
    },
    {
        id: 14,
        subDomain: "1.1 Implement metrics, alarms, and filters by using AWS monitoring and logging services",
        criticalTopic: "Notifications with SNS",
        question: "How do you configure CloudWatch Alarms to send notifications?",
        options: [
            "A. Use Amazon CloudFront",
            "B. Set up an SNS topic and configure the CloudWatch alarm to publish to that topic",
            "C. Use IAM roles",
            "D. Use AWS Lambda"
        ],
        answer: "B. Set up an SNS topic and configure the CloudWatch alarm to publish to that topic",
        explanation: "You can configure CloudWatch alarms to send notifications by using Amazon SNS to deliver messages to email, SMS, or other endpoints."
    },
];
