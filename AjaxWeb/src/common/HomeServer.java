package common;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/html/home")
public class HomeServer extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public HomeServer() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		
		EmpDAO dao=new EmpDAO();
		List<EmployeeVO> list = dao.getEmpList();
		
		String xml = "<dataset>";
		for(EmployeeVO emp : list) {
		xml += "<record>";
		xml += "<employeeId>"+ emp.getEmployeeId() +"</employeeId>"
				+ "<firstName>"+ emp.getFirstName()+ "</firstName>"
				+ "<lastName>" +emp.getLastName() +"</lastName>"
				+ "<email>" + emp.getEmail()+"</email>"
				+ "<hireDate>"+emp.getHireDate()+"</hireDate>"
				+ "<phoneNumber>"+emp.getPhoneNumber()+"</phoneNumber>"
				+ "<jobId>"+emp.getJobId()+"</jobId>"
				+ "<salary>"+emp.getSalary()+"</salary>";
				
		xml	+= "</record>";
		}
		
		xml += "</dataset>";
		
		response.getWriter().append(xml);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
