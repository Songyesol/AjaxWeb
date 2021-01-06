package common;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/deleteEmp")
public class DeleteEmpServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public DeleteEmpServlet() {
        super();
       
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//localhost/Ajaxweb/deleteEmp?empId=210
		String id = request.getParameter("empId");
		id = id ==null? "0": id; //id값이 null이면 parseInt하면 오류가 나기때문에 null이면 0을 넣을 수 있도록 입력한 문장임.
		int employeeId = Integer.parseInt(id); //parameter 값으로 받은 String타입의 값을 int타입으로 변환....
		
		EmployeeVO vo = new EmployeeVO();
		vo.setEmployeeId(employeeId);
		
		EmpDAO dao = new EmpDAO();
		if(dao.deleteEmp(vo)) {
			response.getWriter().append("<h1>OK</h1>");	
		}else {
			response.getWriter().append("<h1>NG</h1>");	
		}
		
	}
	

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
