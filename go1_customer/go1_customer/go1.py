import frappe
from frappe import _


@frappe.whitelist()
def get_username():
   current_user=frappe.session.user
   user_detail = frappe.get_all("User", filters={'name': current_user}, fields=['full_name'])
   return user_detail[0].full_name