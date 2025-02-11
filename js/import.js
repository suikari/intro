const userCode = "imp08548453";


function requestPay (){
    // swal_msg('주의사항','체크카드 결제하시면 안됩니다');



    IMP.init(userCode); // 고객사 식별 코드를 넣어 모듈을 초기화해주세요.

    IMP.request_pay(
    {
        channelKey: "channel-key-51c9145f-ddaa-4880-8839-4bf9cafab2e6",
        merchant_uid: "order_id_1667634130160",
        name: "산나비 DLC",
        pay_method: "EASY_PAY",
        escrow: false,
        amount: "109000",
        tax_free: 3000,
        buyer_name: "홍길동",
        buyer_email: "buyer@example.com",
        buyer_tel: "02-1670-5176",
        buyer_addr: "성수이로 20길 16",
        buyer_postcode: "04783",
        m_redirect_url: "https://helloworld.com/payments/result", // 모바일 환경에서 필수 입력
        notice_url: "https://helloworld.com/api/v1/payments/notice",
        confirm_url: "https://helloworld.com/api/v1/payments/confirm",
        currency: "KRW",
        locale: "ko",
        custom_data: { userId: 30930 },
        display: { card_quota: [0, 6] },
        appCard: false,
        useCardPoint: true,
        bypass: {
        tosspayments: {
            useInternationalCardOnly: true, // 영어 결제창 활성화
        },
        },
    },
    (response) => {
        // PC 환경에서 결제 프로세스 완료 후 실행 될 로직
    },
    );
}