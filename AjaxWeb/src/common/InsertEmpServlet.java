package common;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/insertEmp")
public class InsertEmpServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
  
    public InsertEmpServlet() {
        super();
       
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String fName = request.getParameter("fName");
		String lName = request.getParameter("lName");
		String email = request.getParameter("email");
		String jobId = request.getParameter("jobId");
		
		EmployeeVO vo = new EmployeeVO();
		vo.setFirstName(fName);
		vo.setLastName(lName);
		vo.setEmail(email);
		vo.setJobId(jobId);
		
		EmpDAO dao = new EmpDAO();
		EmployeeVO v = dao.insertEmp(vo);
		String result = "<result>";
		result += "<empId>"+v.getEmployeeId()+"</empId>";
		result += "<fName>"+v.getFirstName()+"</fName>";
		result += "<lName>"+v.getLastName()+"</lName>";
		result += "<email>"+v.getEmail()+"</email>";
		result += "<hDate>"+v.getHireDate()+"</hDate>";
		result += "<jId>"+v.getJobId()+"</jId>";
		result += "<salary>"+v.getSalary()+"</salary>";
		result += "</result>";
		
		response.getWriter().append(result);

	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
	}

}
