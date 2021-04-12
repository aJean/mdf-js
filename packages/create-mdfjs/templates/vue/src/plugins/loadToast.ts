function productLoadingDom(text: String) {
    return `
        <div style="
            height: 40px;
            line-height: 40px;
            background: #333333;
            border-radius: 10px;
            opacity: 0.8;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 14px;
            padding: 18px 24px;
            display: flex;
            align-items: center;
        ">
            <img style="width: 24px; height: 24px; margin-right: 10px;" src="data:image/gif;base64,R0lGODlhKAAnAIABAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUZDRkNFNzk4M0FDMTFFQkFERkQ5REExQkEyMTExQkYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUZDRkNFN0E4M0FDMTFFQkFERkQ5REExQkEyMTExQkYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RkNGQ0U3NzgzQUMxMUVCQURGRDlEQTFCQTIxMTFCRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RkNGQ0U3ODgzQUMxMUVCQURGRDlEQTFCQTIxMTFCRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTD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" />
            <span>${text}</span>
        </div>
    `;
}


export default {
  install(Vue: any, options: any) {
    Vue.config.globalProperties.showLoading = function (text: String) {
        const container = document.createElement('div');
        container.id = 'mwl-loading';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.bottom = '0';
        container.style.right = '0';
        container.style.zIndex = '99999999';
        container.innerHTML = productLoadingDom(text);
        document.body.append(container);
    };

    Vue.config.globalProperties.hideLoading = function () {
        const loadingDom = document.getElementById('mwl-loading');
        if (loadingDom) {
            document.body.removeChild(loadingDom);
        }
    };
  }
};