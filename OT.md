1. JSX:

-   Viết HTML trong file JS

2. Components

-   Là 1 hàm return ra UI
-   Rendering: là quá trình chuyển đổi code trong component thành UI
-   Component render: là quá trình thực thi code trong component theo thứ tự từ trên xuống dưới và return UI

3. State

-   lưu trữ trạng thái của 1 component
-   khi state thay đổi => component render lại

`var x = 1, x = 10`
`const [count, setCount] = useState(5)`

-   count: đại diện cho giá trị của State
-   setCount: là 1 hàm dùng để cập nhật lại giá trị của state
-   x: là giá trị khởi tạo ban đầu

4. Tham trị & tham chiếu

-   Kiểu dữ liệu tham trị: number, string, null, undefined, symbol,boolean, bigInt
-   Kiểu dữ liệu tham chiếu: object, array, function

5. Props

-   là 1 object chứa các giá trị đầu vào của 1 component được truyền từ component cha
-   read only
-   props children

6. Lifecycle

-   Mounting: component lần đầu render xuất hiện trên UI
-   Updating: component update, state thay đổi => component reander lại
-   Unmounting: component bị mất khỏi UI

7. useEffect

-   xử lý life cycle
-   syntax: `useEffect(callback, dependencies)`
-   callback: chạy mỗi khi component render xong (luôn chạy lần đầu khi mounting)

-   dependencies:

    -   không truyền: callback luôn chạy khi component render xong => Updating
    -   []: chạy duy nhất 1 lần đầu tiên => Mounting
    -   có truyền giá trị [x, y]: callback chạy lại mỗi khi x hoặc y thay đổi => Updating

-   cleaning up function:

    -   Mounting: không chạy
    -   Updating: chạy clean up trước rồi mới chạy đoạn code trên nó
    -   Unmounting: chạy

8. localStorage & sessionStorage

-   localStorage:

*   lưu dữ liệu vô hạn, không bị mất đi khi đóng tab
*   dữ liệu đồng bộ giữa các tab

-   sessionStorage:

*   lưu dữ liệu theo phiên, dữ liệu mất đi khi đóng tab
*   không đồng bọ dữ liệu giữa các tab

9. Redux (Zustand)

-   dùng để quản lý Global State, tránh props drilling gây phức tạp và khó quản lý
-   các thành phần:

    -   UI: đại diện phần UI bên phía component
    -   Store: chứa các state, action, reducers
    -   State: là dữ liệu
    -   Action: chứa type và payload (type: loại action, payload: chứa dữ liệu được gửi từ bên UI)
    -   Reducer: chứa các hàm xử lý cập nhật state dựa vào action được gửi lên
    -   useSelector: lấy dữ liệu từ component
    -   useDispatch: gửi action lên reducer

10. Redux và Context

-   khi state thay đổi:

    -   Redux: state chỉ render lại các component dùng state đó
    -   Context: render lại toàn bộ component bọc trong provider khi state của context thay đổi
